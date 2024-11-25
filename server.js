const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


let codes = JSON.parse(fs.readFileSync('codes.json', 'utf-8'));

// Kod doğrulama API 
app.post('/verify-code', (req, res) => {
    const { code } = req.body;

    if (codes.includes(code)) {
        // Kod geçerli kullanıldıktan sonra sil
        codes = codes.filter(c => c !== code);
        fs.writeFileSync('codes.json', JSON.stringify(codes, null, 2));
        res.status(200).send({ success: true, message: 'Kod doğrulandı, video izlenebilir!' });
    } else {
        res.status(400).send({ success: false, message: 'Kod geçersiz veya zaten kullanılmış!' });
    }
});


app.use(express.static('./'));


app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
