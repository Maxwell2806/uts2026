import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function App() {
  // Clue Logika State: Menggunakan array object [2]
  // Inisialisasi dengan array kosong agar Saldo awal Rp 0 [1]
  const [transaksi, setTransaksi] = useState([]);
  const [deskripsi, setDeskripsi] = useState('');
  const [nominal, setNominal] = useState('');

  // Cara hitung total saldo (menggunakan logika: masuk tambah, keluar kurang) [2]
  const totalSaldo = transaksi.reduce((acc, curr) => {
    return curr.tipe === 'masuk' ? acc + curr.nominal : acc - curr.nominal;
  }, 0);

  // Fungsi untuk menambah transaksi sesuai Requirement [1]
  const tambahData = (tipe) => {
    if (!deskripsi || !nominal) {
      alert("Isi deskripsi dan nominal dulu!");
      return;
    }

    const dataBaru = {
      id: Date.now().toString(), // ID unik
      ket: deskripsi,             // Menggunakan 'ket' sesuai clue [2]
      nominal: parseInt(nominal),
      tipe: tipe,                 // 'masuk' atau 'keluar'
    };

    setTransaksi([dataBaru, ...transaksi]);
    setDeskripsi('');
    setNominal('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 1. Header Saldo: Tampilkan total saldo di bagian paling atas [1] */}
      <View style={styles.headerSaldo}>
        <Text style={styles.labelSaldo}>Total Saldo Saat Ini:</Text>
        <Text style={styles.angkaSaldo}>Rp {totalSaldo.toLocaleString()}</Text>
      </View>

      {/* 2. Form Input Transaksi [1] */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Deskripsi (Contoh: Beli Makan)"
          value={deskripsi}
          onChangeText={setDeskripsi}
        />
        <TextInput
          style={styles.input}
          placeholder="Nominal (Contoh: 50000)"
          value={nominal}
          keyboardType="numeric"
          onChangeText={setNominal}
        />
        
        {/* Menggunakan 2 tombol sesuai instruksi [1] */}
        <View style={styles.rowTombol}>
          <TouchableOpacity 
            style={[styles.btn, { backgroundColor: '#2ecc71' }]} 
            onPress={() => tambahData('masuk')}
          >
            <Text style={styles.btnText}>Pemasukan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.btn, { backgroundColor: '#e74c3c' }]} 
            onPress={() => tambahData('keluar')}
          >
            <Text style={styles.btnText}>Pengeluaran</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. List History (Riwayat) menggunakan FlatList [1] */}
      <View style={{ flex: 1 }}>
        <Text style={styles.titleHistory}>Riwayat Transaksi</Text>
        <FlatList
          data={transaksi}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardHistory}>
              <Text style={styles.txtKet}>{item.ket}</Text>
              {/* 4. Styling & Logika Warna: Hijau (Masuk), Merah (Keluar) [1] */}
              <Text style={[
                styles.txtNominal, 
                { color: item.tipe === 'masuk' ? 'green' : 'red' }
              ]}>
                {item.tipe === 'masuk' ? '+' : '-'} Rp {item.nominal.toLocaleString()}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.txtEmpty}>Belum ada transaksi, Bro!</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd', paddingHorizontal: 20 },
  headerSaldo: { 
    marginTop: 40, 
    padding: 25, 
    backgroundColor: '#34495e', 
    borderRadius: 15, 
    alignItems: 'center',
    elevation: 5 
  },
  labelSaldo: { color: '#ecf0f1', fontSize: 14, marginBottom: 5 },
  angkaSaldo: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  formContainer: { marginVertical: 25 },
  input: { 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 10,
    fontSize: 16 
  },
  rowTombol: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { flex: 1, padding: 15, borderRadius: 10, marginHorizontal: 5, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  titleHistory: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#2c3e50' },
  cardHistory: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  txtKet: { fontSize: 16, color: '#34495e' },
  txtNominal: { fontSize: 16, fontWeight: 'bold' },
  txtEmpty: { textAlign: 'center', marginTop: 30, color: '#95a5a6', fontSize: 16 }
});