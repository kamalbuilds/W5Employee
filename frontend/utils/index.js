const forge = require('node-forge')
const srt = "a91735e7fdf511e54ecbd14140f4541b6be486cac0257b86d7101a32242d298d"; // this will remain same
const PK = "-----BEGIN RSA PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA0eN6neDgNm0mLl4z5Db8\nFNtSD2WgSW4h2icJ7mr8XzVG0imEPmKTk9ru1o0oxKgXgVzsCoTjKVc3z2EOox6J\nmzpUibnWKHHJLDBjeuDVNosWUBGqd2cwroiMOpt/E7hk057T58IY58TFdsD0rGQ+\nrprgGYryFLxMLs4cAEuO8S+bwOpE+RNNxTjUp+9sY7PYCD3LgiW2KJu76q4OtiXj\nY5KojUwyqFbuqyDIc0JMnhJ5mnfxxq9gxsp7GAdkRztcbpNDIuOKQLg/KTzDWHyX\n6GcWj9qQV4FdTOaPQBTbCaVH9WM5bs5LDtkHkEsgtOTWC06/n8t39+6pqr0EPad+\nQx59hph6QgxfLQtVk2pw3QWM/RVBUXvNtfLt97UIxffXfkyxcIJz2LiexMq/39+l\nw5HQ/+9TNMaEUAVTW3zYkKyiCkFugWSRbUSvoRKqrW3PKe25FqCtqrRX0EnuCANJ\n91ZN276KmwJ4Itk9tRflB/QYLgrT5nyLXCPe7x/OToflQ4ItdzcHL2W8fiB5uZTF\nmMjEe2MB9btL9rFYWYzCjGy/597Ouu29ltvKBe2drcO0EGgsy1KHWcXew1P5sObv\nxCehsgoGIyrfZYGo/ZpPerEYUfpQai7Dml5mVEXBkhlvSM4ZJnZN+MtexT0ORhPX\nBkrNoIX7bLraF6Hx5enHeIMCAwEAAQ==\n-----END RSA PUBLIC KEY-----\n"
const entitySecret = forge.util.hexToBytes(srt)
const publicKey = forge.pki.publicKeyFromPem(PK)
const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', {
  md: forge.md.sha256.create(),
  mgf1: {
    md: forge.md.sha256.create(),
  },
})


console.log(forge.util.encode64(encryptedData));

const Ciphertext= "cldQkoNtBYQt8S4SAJb+nhASiXjMcWpl3kavQYUCgOwKrHHV4hZN5mP/NKJ5Q4w7q1WUU7bAQgFNQHJ/xmwasYlh8LrMcmEdM2ouV4+SfRr3lbWGfpgAd0+ODv/i8nOzlGo7fXoc1PVZyT2w+RhGZ7etk9FQ61u5tmk50ld0zRztPcq1vDBffj7iRrVUhmv+bYkYnnHxhWySynEk/uAv2lpigePyXo4V8JQLrRpzajQgUSplmAfULX21ztu4INwYtr2YRpB9pO7MsRoku1uUDfKXIHg2RarNbbtT3/S6lVLsGvmD7QndoMQo2U0wiVSwVaBB4Hw+8FqqgWu61xFvrcFyQ8Wbn6CWtkY5p+Knnww56CvFq3dJ5jNRQ86r4jUPkudUU0sgpZpEJWhDEOFndIJGIHqi9VnOewtHwNUEFPgW+CY+YLOxcMFzKMBngyWdEYJ3xX/FVj+Oob+g6hi6dJN4jDwUkLV4bJVKqTqNYAfl5wQ8Mkml3cYMhrRrL/7ISbYIBJ89bkPTgQIwVp4/E4l9H/5M/3d9dElyjDIPzAt4GNsYTG8lcOB9UR4GUGGe+sHH6WAScT0385uAvQbqtuIxWHrxjEIpnU/HZFGsOs/v/WtBhpuxmdOh7gTyXCMf8H6KPL6adxsvVXIQhLKnaR8OKo+5bAokRpqGtqFauJc="