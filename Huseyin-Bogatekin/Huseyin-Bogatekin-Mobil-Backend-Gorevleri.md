# Hüseyin Boğatekin — Mobil Back-End (API) Görevleri (FitStack)

**Mobil Front-end ile Back-end Bağlanmış Test Videosu:** [Video eklenecek](https://example.com)

Bu doküman, Hüseyin’in mobil tarafta karşıladığı işlevlerin bağlandığı **REST API uçları** ve **beklenen kullanım** özetidir. Sunucu adresi: **`http://localhost:3000`**. Tam sözleşme: [MobilBackEnd.md](../MobilBackEnd.md), [openapi.yaml](../openapi.yaml).

---

## 1. Kullanıcı girişi (Gereksinim 2)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `POST /users/login` |
| **Gövde** | `email`, `password` |
| **Başarı** | `200`, `token`, `user` |
| **Mobil not** | `token` AsyncStorage’a yazılmalı; hatalı girişte `401` ve `INVALID_CREDENTIALS` mesajı gösterilmelidir. |

---

## 2. Profil güncelleme (Gereksinim 4)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `PUT /users/profile` |
| **Gövde** | `name`, `username`, `email`, `level` (güncellenecek alanlar) |
| **Yanıt** | `200`, güncel `user` |
| **Mobil not** | E-posta değişiminde `409` (`EMAIL_IN_USE`) senaryosu ele alınmalıdır. |

---

## 3. Program listeleme (Gereksinim 6)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `GET /programs` |
| **Yanıt** | `programs[]`, `count` |
| **Mobil not** | Filtre olmadan tüm programlar; performans için sayfalama backend’e eklenirse mobil uyum sağlanır. |

---

## 4. Program seçme ve detay görüntüleme (Gereksinim 8)

| Öğe | Değer |
|-----|--------|
| **Detay** | `GET /programs/:id` — tek `program` nesnesi |
| **Seçim** | `POST /programs/:id/select` — `programId`, tam `program` dönebilir |
| **Mobil not** | Detayda `404` durumunda kullanıcıya “Program bulunamadı” mesajı. |

---

## 5. Geçmiş antrenmanları görüntüleme (Gereksinim 10)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `GET /workouts` |
| **Yanıt** | `workouts[]`, `count` |
| **Mobil not** | Öğe alanları: `id`, `programId`, `programTitle`, `duration`, `calories`, `date`, `note`. |

---

## 6. Toplam puan görüntüleme (Gereksinim 12)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `GET /users/points` |
| **Yanıt** | `totalPoints`, `userId`, `updatedAt` |
| **Mobil not** | Bu endpoint, `PUT /workouts/:id/points` sonrası toplamın güncel halini okumak için kullanılır (G-11 ile ilişkili). |

---

## 7. Rozetleri görüntüleme (Gereksinim 14)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `GET /badges` |
| **Yanıt** | `badges[]` (`id`, `key`, `name`, `earnedAt`), `count` |
| **Mobil not** | Salt okuma; yeni rozet **POST /badges** ile Sema tarafındaki akışla tetiklenebilir, liste bu ekranda yenilenir. |

---

## 8. Seri bilgisi güncelleme (Gereksinim 16)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `PUT /streak` |
| **Gövde** | `currentStreak`, `lastWorkoutDate` (isteğe bağlı alanlar) |
| **Yanıt** | `200`, güncel `streak` |
| **Mobil not** | `GET /streak` ile okuma aynı ekranda veya sekme içi alt görünümde birleştirilebilir. |

---

## Test önerisi

- Giriş → program listesi → detay → seç → geçmiş antrenmanlar → toplam puan → rozet listesi → seri güncelle sırası ile uçtan uca demo.  
- Hata kodları (`401`, `404`, `409`) için kısa video kesitleri.
