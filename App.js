import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mrimlrxgnromjufqhyga.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaW1scnhnbnJvbWp1ZnFoeWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMTcwODF9.abc'; // استبدله بالمفتاح الصحيح إن احتجت
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [department, setDepartment] = useState('التعليم المهني');

  const handleRegister = async () => {
    if (!studentName || !studentPhone || !parentPhone) {
      Alert.alert('تنبيه', 'يرجى ملء الحقول الأساسية (الاسم وأرقام الهواتف)');
      return;
    }

    try {
      const { error } = await supabase
        .from('students')
        .insert([
          { 
            full_name: studentName, 
            student_phone: studentPhone, 
            parent_phone: parentPhone, 
            department: department 
          }
        ]);

      if (error) {
        Alert.alert('خطأ', 'فشل الحفظ: ' + error.message);
      } else {
        Alert.alert('تم', 'تم تسجيل الطالب بنجاح وإرسال البيانات');
        setCurrentScreen('dashboard');
      }
    } catch (err) {
      Alert.alert('خطأ', 'حدث خطأ في الاتصال بقاعدة البيانات');
    }
  };

  if (currentScreen === 'welcome') {
    return (
      <SafeAreaView style={styles.welcomeContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.headerTitle}>تسجيل طالب جديد في منصة أستاذ علي صالح جودة</Text>
          <Text style={styles.subheader}>أدخل معلوماتك الأساسية للانضمام إلى المنصة</Text>

          <View style={styles.formCard}>
            <Text style={styles.label}>اسم الطالب الرباعي</Text>
            <TextInput
              style={styles.input}
              placeholder="...أدخل اسمك الرباعي"
              placeholderTextColor="#888"
              value={studentName}
              onChangeText={setStudentName}
            />

            <Text style={styles.label}>رقم هاتف الطالب</Text>
            <TextInput
              style={styles.input}
              placeholder="07xxxxxxxx"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={studentPhone}
              onChangeText={setStudentPhone}
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
              <Text style={styles.submitButtonText}>إرسال التسجيل</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.dashboardContainer}>
      <Text style={styles.welcomeUserText}>أهلاً بك، {studentName} في لوحة التحكم</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('welcome')}>
        <Text style={styles.backButtonText}>العودة للتسجيل</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: { flex: 1, backgroundColor: '#1a1a1a' },
  scrollContainer: { padding: 20, alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 10 },
  subheader: { fontSize: 14, color: '#aaa', textAlign: 'center', marginBottom: 20 },
  formCard: { width: '100%', maxWidth: 400, backgroundColor: '#2a2a2a', padding: 20, borderRadius: 10 },
  label: { color: '#fff', fontSize: 14, marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#333', color: '#fff', padding: 10, borderRadius: 5, borderWidth: 1, borderColor: '#444' },
  submitButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  dashboardContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' },
  welcomeUserText: { color: '#fff', fontSize: 20, marginBottom: 20 },
  backButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  backButtonText: { color: '#fff', fontSize: 14 }
});
