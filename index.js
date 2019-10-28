const express = require('express');
const app = express();

var pgp = require('pg-promise')();
var dbPromise = pgp('postgres://lasti@103.122.5.98:51751/lastidb');

function getPegawaiID(callback, id){
    dbPromise.any('SELECT * FROM pegawai WHERE id=$1', id)
        .then(data => {
            callback(null, data)
        })
        .catch(err => {
            callback(err)
        })
}

function getAllPegawai(callback){
    dbPromise.any('SELECT * FROM pegawai')
        .then(data => {
            callback(null, data)
        })
        .catch(err => {
            callback(err)
        })
}

app.route('/pegawai')
    .get(function (req, res) {
        getAllPegawai(function (err, data) {
            if (err) {
                res.send(err)
            } else {
                res.send(data)
            }
        })
    })
    .post(function (req, res) {
        pegawaiBaru = {
            nama: req.query.nama,
            alamat: req.query.alamat,
            kontak: req.query.kontak,
            email: req.query.email,
            jabatan: req.query.jabatan,
            gaji: req.query.gaji,
            status: req.query.status
        }
        dbPromise.any('INSERT INTO PEGAWAI(nama, alamat, kontak, email, jabatan, gaji, status) VALUES(${nama},${alamat},${kontak},${email},${jabatan},${gaji},${status})', pegawaiBaru)
            .then(function() {
                res.send()
                console.log("Ada Pegawai Baru!")
            })
            .catch(function(err) {
                res.send(err)
            })
    })

    app.get('/pegawai/:id', function (req, res) {
        getPegawaiID(function (err, data) {
            if (err) {
                res.send(err)
            } else {
                res.send(data)
            }
        }, req.params.id)
    })
    
    
    
    app.listen(8000)

