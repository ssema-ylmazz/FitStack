'use strict';

const QUEUE = 'fitstack.workout.created';

let connection = null;
let channel = null;
let initRunning = false;
let missingPackageLogged = false;

function tryRequireAmqplib() {
  try {
    return require('amqplib');
  } catch {
    if (!missingPackageLogged) {
      missingPackageLogged = true;
      console.warn('[rabbitmq] amqplib paketi yüklü değil; RabbitMQ no-op.');
    }
    return null;
  }
}

function safeClose() {
  try {
    if (channel) {
      channel.close().catch(() => {});
    }
  } catch {
    /* ignore */
  }
  channel = null;
  try {
    if (connection) {
      connection.close().catch(() => {});
    }
  } catch {
    /* ignore */
  }
  connection = null;
}

async function doInit() {
  const amqp = tryRequireAmqplib();
  if (!amqp) return;

  const url = process.env.RABBITMQ_URL;
  if (!url || String(url).trim() === '') {
    console.warn('[rabbitmq] RABBITMQ_URL tanımlı değil; RabbitMQ atlanıyor.');
    return;
  }

  connection = await amqp.connect(url);
  connection.on('error', (err) => {
    console.warn('[rabbitmq] connection error:', err && err.message ? err.message : err);
    channel = null;
  });
  connection.on('close', () => {
    channel = null;
  });

  const ch = await connection.createChannel();
  await ch.assertQueue(QUEUE, { durable: true });

  ch.consume(
    QUEUE,
    (msg) => {
      if (!msg) return;
      try {
        const text = msg.content.toString();
        console.log('[rabbitmq consumer]', QUEUE, text);
      } catch (err) {
        console.warn('[rabbitmq] consumer:', err && err.message ? err.message : err);
      }
      try {
        ch.ack(msg);
      } catch {
        /* ignore */
      }
    },
    { noAck: false },
  );

  channel = ch;
}

/**
 * Arka planda bağlanır; hata loglanır, process çökmez.
 */
function initRabbitMQ() {
  if (initRunning) return;
  initRunning = true;
  Promise.resolve()
    .then(() => doInit())
    .catch((err) => {
      console.warn('[rabbitmq] init başarısız:', err && err.message ? err.message : err);
      safeClose();
    })
    .finally(() => {
      initRunning = false;
    });
}

/**
 * @param {object} payload
 */
function publishWorkoutCreated(payload) {
  try {
    if (!channel) return;
    const body = Buffer.from(JSON.stringify(payload));
    channel.sendToQueue(QUEUE, body, { persistent: true });
  } catch (err) {
    console.warn('[rabbitmq] publishWorkoutCreated:', err && err.message ? err.message : err);
  }
}

module.exports = {
  initRabbitMQ,
  publishWorkoutCreated,
};
