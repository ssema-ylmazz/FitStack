# Sema Nur Yılmaz — Mobil Back-End (API) Görevleri (FitStack)

**Mobil Front-end ile Back-end Bağlanmış Test Videosu:** [Video eklenecek](https://example.com)

Bu doküman, Sema’nın mobil tarafta karşıladığı işlevlerin bağlandığı **REST API uçları** ve **beklenen kullanım** özetidir. Sunucu adresi: **`http://localhost:3000`**. Tam sözleşme: [MobilBackEnd.md](../MobilBackEnd.md), [openapi.yaml](../openapi.yaml).

---

## 1. Kullanıcı kaydı olma (Gereksinim 1)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `POST /users/register` |
| **Gövde** | `email`, `password` (zorunlu); `username`, `name` (isteğe bağlı) |
| **Başarı** | `201`, `user` nesnesi |
| **Mobil not** | Kayıt sonrası dönen oturum politikası (otomatik giriş vs.) ürün kararıdır; token kullanılacaksa saklama akışı netleştirilmelidir. |

---

## 2. Profil görüntüleme (Gereksinim 3)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `GET /users/profile` |
| **Yanıt** | `success`, `user`: `id`, `name`, `username`, `email`, `level` |
| **Mobil not** | Oturumun sunucuda tanınması için gerekirse ileride `Authorization` başlığı eklenebilir. |

---

## 3. Hesap silme (Gereksinim 5)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `DELETE /users/profile` |
| **Yanıt** | `200`, `success`, `message` |
| **Mobil not** | İstek öncesi kullanıcı onayı; ardından AsyncStorage’daki token silinmeli ve navigasyon auth köküne dönmelidir. |

---

## 4. Program filtreleme (Gereksinim 7)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `GET /programs?level=beginner` (veya `intermediate`, `advanced`) |
| **Yanıt** | `programs[]`, `count` |
| **Mobil not** | Geçersiz `level` için `400` ve `INVALID_LEVEL` hatası dokümante edilmiştir. |

---

## 5. Antrenman kaydı oluşturma (Gereksinim 9)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `POST /workouts` |
| **Gövde** | `programId`, `duration`, `calories`, `date`, `note` (uygun olanlar) |
| **Yanıt** | `201`, `workout` nesnesi |
| **Mobil not** | `programId` yoksa sunucu seçili veya varsayılan program kullanır; önce `POST /programs/:id/select` önerilir. |

---

## 6. Puan kazanma (Gereksinim 11)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `PUT /workouts/:id/points` |
| **Gövde** | `points` (sayı, isteğe bağlı) |
| **Yanıt** | `gainedPoints`, `totalPoints`, `workout`, vb. |
| **Mobil not** | Yanıttaki `totalPoints` ile `PointsScreen` senkronize edilebilir. |

---

## 7. Rozet kazanma (Gereksinim 13)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `POST /badges` |
| **Gövde** | `key`, `name` (isteğe bağlı) |
| **Yanıt** | `201`, `badge` |
| **Mobil not** | İş kuralı (hangi puanda hangi rozet) istemci veya sunucu tarafında netleştirilmelidir. |

---

## 8. Günlük seri görüntüleme (Gereksinim 15)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `GET /streak` |
| **Yanıt** | `streak`: `currentStreak`, `lastWorkoutDate`, `updatedAt` |
| **Mobil not** | `StreakScreen` üzerinde gösterim ve çekme-yenileme (pull-to-refresh) eklenebilir. |

---

## 9. Antrenman kaydını silme (Gereksinim 17)

| Öğe | Değer |
|-----|--------|
| **Endpoint** | `DELETE /workouts/:id` |
| **Yanıt** | `200`, silinen `workout` özeti |
| **Mobil not** | Listeden kaldırma ve hata durumunda `404` kullanıcı mesajı. |

---

## Test önerisi

- Postman koleksiyonu veya mobil içi log ile her endpoint için en az bir başarı senaryosu.  
- Video teslimi için: kayıt → program filtrele → antrenman ekle → puan → rozet → seri görüntüle → sil → hesap sil (akış sırası ürün kararına göre uyarlanabilir).
