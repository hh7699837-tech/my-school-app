import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [idFront, setIdFront] = useState('');
  const [idBack, setIdBack] = useState('');
  
  // حقول بوت الذكاء الاصطناعي والتواصل
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('مرحباً بك! أنا مساعد الذكاء الاصطناعي، كيف يمكنني مساعدتك في دراستك اليوم؟');
  const [adminMessage, setAdminMessage] = useState('');
  const [supervisorMessage, setSupervisorMessage] = useState('');

  const handleRegister = () => {
    if (!studentName || !studentPhone || !parentPhone) {
      Alert.alert('تنبيه', 'يرجى ملء الحقول الأساسية (الاسم وأرقام الهواتف)');
      return;
    }
    Alert.alert('تم التسجيل بنجاح', `أهلاً بك يا ${studentName} في منصة أستاذ علي صالح جودة`);
    setCurrentScreen('dashboard');
  };

  const handleAskAI = () => {
    if (!aiQuery) return;
    setAiResponse(`جاري تحليل سؤالك (${aiQuery})... الإجابة: هذا استفسار ممتاز في المنهج، تابع معنا المحاضرة الخاصة بهذا القسم لتفاصيل أكثر.`);
    setAiQuery('');
  };

  const handleSendAdmin = () => {
    if (!adminMessage) return;
    Alert.alert('تم الإرسال', 'تم إرسال رسالتك إلى إدارة المنصة بنجاح.');
    setAdminMessage('');
  };

  const handleSendSupervisor = () => {
    if (!supervisorMessage) return;
    Alert.alert('تم الإرسال', 'تم إرسال رسالتك إلى مشرف المنصة (حسين كاظم جودة) بنجاح.');
    setSupervisorMessage('');
  };

  // 1. شاشة الترحيب
  if (currentScreen === 'welcome') {
    return (
      <SafeAreaView style={styles.welcomeContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#1e3d59" />
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>منصة أستاذ علي صالح جودة التعليمية</Text>
          <Text style={styles.welcomeSubtitle}>إعداد وإشراف: حسين كاظم جودة</Text>
          <Text style={styles.welcomeDesc}>مرحباً بك في المنصة الرسمية لرفع الكتب والمراجع والدروس.</Text>
          
          <TouchableOpacity 
            style={styles.welcomeButton}
            onPress={() => setCurrentScreen('register')}
          >
            <Text style={styles.welcomeButtonText}>ابدأ الانضمام والتسجيل</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // 2. شاشة التسجيل
  if (currentScreen === 'register') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>تسجيل طالب جديد</Text>
        <Text style={styles.subHeader}>املأ البيانات بدقة لإتمام الانضمام للمنصة</Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>اسم الطالب الرباعي:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="ادخل اسمك الرباعي..." 
            value={studentName}
            onChangeText={setStudentName}
          />

          <Text style={styles.label}>رقم الطالب:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="07xxxxxxxx" 
            keyboardType="phone-pad"
            value={studentPhone}
            onChangeText={setStudentPhone}
          />

          <Text style={styles.label}>رقم ولي الأمر:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="07xxxxxxxx" 
            keyboardType="phone-pad"
            value={parentPhone}
            onChangeText={setParentPhone}
          />

          <Text style={styles.label}>رابط أو صورة البطاقة الموحدة (الوجه الأمامي):</Text>
          <TextInput 
            style={styles.input} 
            placeholder="ارفاق رابط أو اسم صورة الوجه الأمامي" 
            value={idFront}
            onChangeText={setIdFront}
          />

          <Text style={styles.label}>رابط أو صورة البطاقة الموحدة (الوجه الخلفي):</Text>
          <TextInput 
            style={styles.input} 
            placeholder="ارفاق رابط أو اسم صورة الوجه الخلفي" 
            value={idBack}
            onChangeText={setIdBack}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
            <Text style={styles.submitButtonText}>إتمام التسجيل والدخول</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // 3. لوحة التحكم الرئيسية والأقسام والذكاء الاصطناعي
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.dashboardHeader}>
        <Text style={styles.dashTitle}>منصة أستاذ علي صالح جودة</Text>
        <Text style={styles.dashSub}>مرحباً بك: {studentName || 'الطالب'}</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentScreen('welcome')}>
          <Text style={styles.backBtnText}>الرئيسية</Text>
        </TouchableOpacity>
      </View>

      {/* الأقسام الدراسية */}
      <Text style={styles.sectionHeading}>الأقسام والخدمات التعليمية</Text>
      <View style={styles.gridContainer}>
        <View style={styles.gridCard}>
          <Text style={styles.gridCardTitle}>📚 الملازم والكتب</Text>
          <Text style={styles.gridCardText}>تحميل المناهج الدراسية بصيغة PDF</Text>
        </View>
        <View style={styles.gridCard}>
          <Text style={styles.gridCardTitle}>📊 الحضور والغياب</Text>
          <Text style={styles.gridCardText}>متابعة التواجد اليومي للطلبة</Text>
        </View>
        <View style={styles.gridCard}>
          <Text style={styles.gridCardTitle}>💻 قسم الحاسبات</Text>
          <Text style={styles.gridCardText}>دروس البرمجة والصيانة والتقنية</Text>
        </View>
        <View style={styles.gridCard}>
          <Text style={styles.gridCardTitle}>🛡️ الأمن السيبراني</Text>
          <Text style={styles.gridCardText}>أساسيات الحماية وأمن المعلومات</Text>
        </View>
      </View>

      {/* بوت الذكاء الاصطناعي */}
      <View style={styles.aiCard}>
        <Text style={styles.aiTitle}>🤖 مساعد الذكاء الاصطناعي (AI)</Text>
        <Text style={styles.aiResponseText}>{aiResponse}</Text>
        <TextInput 
          style={styles.input} 
          placeholder="اطرح سؤالك البرمجي أو العلمي هنا..." 
          value={aiQuery}
          onChangeText={setAiQuery}
        />
        <TouchableOpacity style={styles.aiButton} onPress={handleAskAI}>
          <Text style={styles.submitButtonText}>إرسال السؤال للبوت</Text>
        </TouchableOpacity>
      </View>

      {/* مراسلة الإدارة ومشرف المنصة */}
      <View style={styles.contactContainer}>
        <View style={styles.contactBox}>
          <Text style={styles.label}>مراسلة إدارة المنصة:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="اكتب رسالتك للإدارة..." 
            value={adminMessage}
            onChangeText={setAdminMessage}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSendAdmin}>
            <Text style={styles.submitButtonText}>إرسال للإدارة</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.label}>مراسلة مشرف المنصة (حسين كاظم):</Text>
          <TextInput 
            style={styles.input} 
            placeholder="استفسار تقني أو مشكلة بالتطبيق..." 
            value={supervisorMessage}
            onChangeText={setSupervisorMessage}
          />
          <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#e8a87c' }]} onPress={handleSendSupervisor}>
            <Text style={[styles.submitButtonText, { color: '#1e3d59' }]}>إرسال للمشرف التقني</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: { flex: 1, backgroundColor: '#1e3d59', justifyContent: 'center', alignItems: 'center', padding: 20 },
  welcomeCard: { backgroundColor: '#ffffff', width: '100%', padding: 25, borderRadius: 15, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, elevation: 5 },
  welcomeTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e3d59', textAlign: 'center', marginBottom: 10 },
  welcomeSubtitle: { fontSize: 14, color: '#e8a87c', fontWeight: '600', marginBottom: 15, textAlign: 'center' },
  welcomeDesc: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 25 },
  welcomeButton: { backgroundColor: '#17b978', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, width: '100%', alignItems: 'center' },
  welcomeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  container: { padding: 20, backgroundColor: '#f5f7fa', flexGrow: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e3d59', textAlign: 'center', marginBottom: 5 },
  subHeader: { fontSize: 13, color: '#e8a87c', textAlign: 'center', marginBottom: 20 },
  
  formCard: { backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, elevation: 3, marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff', padding: 12, borderRadius: 8, fontSize: 14, marginBottom: 10 },
  
  submitButton: { backgroundColor: '#17b978', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  dashboardHeader: { backgroundColor: '#1e3d59', padding: 20, borderRadius: 12, marginBottom: 20, alignItems: 'center' },
  dashTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  dashSub: { fontSize: 13, color: '#e8a87c', marginBottom: 10 },
  backBtn: { backgroundColor: '#e8a87c', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 6 },
  backBtnText: { color: '#1e3d59', fontSize: 12, fontWeight: 'bold' },

  sectionHeading: { fontSize: 16, fontWeight: 'bold', color: '#1e3d59', marginBottom: 12, textAlign: 'right' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  gridCard: { width: '48%', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  gridCardTitle: { fontSize: 14, fontWeight: 'bold', color: '#1e3d59', marginBottom: 5 },
  gridCardText: { fontSize: 12, color: '#666' },

  aiCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#17b978' },
  aiTitle: { fontSize: 15, fontWeight: 'bold', color: '#17b978', marginBottom: 10 },
  aiResponseText: { fontSize: 13, color: '#444', backgroundColor: '#f0f9f4', padding: 10, borderRadius: 8, marginBottom: 10 },
  aiButton: { backgroundColor: '#1e3d59', padding: 12, borderRadius: 8, alignItems: 'center' },

  contactContainer: { marginBottom: 30 },
  contactBox: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 }
});
