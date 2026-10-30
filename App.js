const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  welcomeContainer: { flex: 1, backgroundColor: '#1e3d59', justifyContent: 'center', alignItems: 'center', padding: 20 },
  welcomeCard: { backgroundColor: '#ffffff', width: '100%', padding: 25, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 8 },
  welcomeTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e3d59', textAlign: 'center', marginBottom: 10 },
  welcomeSubtitle: { fontSize: 14, color: '#e8a87c', fontWeight: '600', marginBottom: 15 },
  welcomeDesc: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 25 },
  welcomeButton: { backgroundColor: '#17b978', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, width: '100%', alignItems: 'center' },
  welcomeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  header: { backgroundColor: '#1e3d59', padding: 25, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, position: 'relative' },
  backButton: { position: 'absolute', left: 20, top: 30 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 5 },
  headerSubtitle: { color: '#e8a87c', fontSize: 13, marginTop: 5 },
  sectionTitleContainer: { paddingHorizontal: 20, marginTop: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  card: { backgroundColor: '#fff', width: '48%', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  cardText: { marginTop: 10, fontSize: 14, fontWeight: 'bold', color: '#1e3d59' },
  formContainer: { padding: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 14, color: '#333' },
  submitButton: { backgroundColor: '#17b978', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  listContainer: { padding: 20 },
  bookCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 15, elevation: 3 },
  bookInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  bookTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e3d59' },
  bookSubject: { fontSize: 12, color: '#777', marginTop: 2 },
  downloadButton: { backgroundColor: '#1e3d59', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, borderRadius: 6 },
  downloadText: { color: '#fff', fontWeight: 'bold', marginLeft: 6, fontSize: 13 },
});
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, StatusBar, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [students, setStudents] = useState([
    { id: 1, name: 'علي حسن', phone: '07700000000', parentPhone: '07800000000', branch: 'حاسبات', average: 92.5, rank: 1 },
    { id: 2, name: 'فاطمة حسين', phone: '07711111111', parentPhone: '07811111111', branch: 'أمن سيبراني', average: 88.0, rank: 2 },
  ]);

  const [books, setBooks] = useState([
    { id: '1', title: 'ملزمة صيانة الحاسوب', subject: 'قسم الحاسوب', link: 'https://example.com/book1.pdf' },
    { id: '2', title: 'أساسيات الأمن السيبراني', subject: 'قسم الأمن السيبراني', link: 'https://example.com/book2.pdf' },
    { id: '3', title: 'مبادئ البرمجة والتطبيقات', subject: 'عام', link: 'https://example.com/book3.pdf' },
  ]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [branch, setBranch] = useState('حاسبات');

  const handleRegister = () => {
    if (!name.trim()  !phone.trim()  !parentPhone.trim()) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    const newStudent = {
      id: Date.now().toString(),
      name,
      phone,
      parentPhone,
      branch,
      average: 'قيد التقييم',
      rank: 'جديد',
    };
    setStudents([...students, newStudent]);
    Alert.alert('نجاح', 'تم تسجيل الطالب بنجاح');
    setName('');
    setPhone('');
    setParentPhone('');
    setCurrentScreen('home');
  };

  const openPdf = (url) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('تنبيه', 'سيكون رابط تنزيل الملف متاحاً فور رفعه من الأستاذ.');
    });
  };

  if (currentScreen === 'welcome') {
    return (
      <View style={styles.welcomeContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1e3d59" />
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>منصة أستاذ علي صالح جودة التعليمية</Text>
          <Text style={styles.welcomeSubtitle}>إعداد وإشراف: حسين كاظم جودة</Text>
          <Text style={styles.welcomeDesc}>مرحباً بك في المنصة الرسمية لرفع الكتب والمراجع والدروس.</Text>
          
          <TouchableOpacity 
            style={styles.welcomeButton} 
            onPress={() => setCurrentScreen('home')}
          >
            <Text style={styles.welcomeButtonText}>اضغط للبدء</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (currentScreen === 'home') {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1e3d59" />
        
        <View style={styles.header}>
          <Ionicons name="school" size={40} color="#fff" />
          <Text style={styles.headerTitle}>منصة أستاذ علي صالح جودة</Text>
          <Text style={styles.headerSubtitle}>إعداد وإشراف: حسين كاظم جودة</Text>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>القائمة الرئيسية</Text>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => setCurrentScreen('register')}
          >
            <Ionicons name="person-add-outline" size={32} color="#1e3d59" />
            <Text style={styles.cardText}>تسجيل الطالب</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card} 
            onPress={() => setCurrentScreen('books')}
          >
            <Ionicons name="document-text-outline" size={32} color="#1e3d59" />
            <Text style={styles.cardText}>الكتب والملازم</Text>
          </TouchableOpacity>
<TouchableOpacity style={styles.card} onPress={() => Alert.alert('قريباً', 'قسم صفحة الطالب قيد التطوير')}>
            <Ionicons name="id-card-outline" size={32} color="#1e3d59" />
            <Text style={styles.cardText}>صفحة الطالب</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => Alert.alert('قريباً', 'قسم الدورات قيد التطوير')}>
            <Ionicons name="book-outline" size={32} color="#1e3d59" />
            <Text style={styles.cardText}>الدورات والدروس</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => Alert.alert('قريباً', 'قسم الدرجات قيد التطوير')}>
            <Ionicons name="stats-chart-outline" size={32} color="#1e3d59" />
            <Text style={styles.cardText}>الدرجات</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => Alert.alert('قريباً', 'قسم الاختبارات الإلكترونية قيد التطوير')}>
            <Ionicons name="checkmark-done-circle-outline" size={32} color="#1e3d59" />
            <Text style={styles.cardText}>الاختبارات</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  if (currentScreen === 'books') {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('home')}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>الكتب والملازم الدراسية</Text>
          <Text style={styles.headerSubtitle}>إشراف: حسين كاظم جودة</Text>
        </View>

        <View style={styles.listContainer}>
          {books.map((book) => (
            <View key={book.id} style={styles.bookCard}>
              <View style={styles.bookInfo}>
                <Ionicons name="document-attach" size={30} color="#1e3d59" />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookSubject}>{book.subject}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.downloadButton} onPress={() => openPdf(book.link)}>
                <Ionicons name="cloud-download-outline" size={20} color="#fff" />
                <Text style={styles.downloadText}>تحميل PDF</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('home')}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تسجيل طالب جديد</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>اسم الطالب الكامل</Text>
        <TextInput
          style={styles.input}
          placeholder="أدخل اسم الطالب..."
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>رقم هاتف الطالب</Text>
        <TextInput
          style={styles.input}
          placeholder="07xxxxxxxx"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>رقم ولي الأمر</Text>
        <TextInput
          style={styles.input}
          placeholder="07xxxxxxxx"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={parentPhone}
          onChangeText={setParentPhone}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
          <Text style={styles.submitButtonText}>حفظ وتسجيل الطالب</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
