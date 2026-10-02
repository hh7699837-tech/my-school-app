import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [supportMessage, setSupportMessage] = useState('');

  const handleSendSupport = () => {
    if (supportMessage.trim() === '') {
      Alert.alert('تنبيه', 'يرجى كتابة الرسالة قبل الإرسال');
      return;
    }
    Alert.alert('تم الإرسال', 'تم إرسال رسالتك بنجاح إلى الإدارة!');
    setSupportMessage('');
  };

  // شاشة البداية (Splash Screen)
  if (currentScreen === 'splash') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.splashContent}>
          <View style={styles.logoCircle}>
            <Text style={{ fontSize: 40 }}>🎓</Text>
          </View>
          <Text style={styles.splashTitle}>منصة المستقبل</Text>
          <Text style={styles.splashSubtitle}>
            كل ما يحتاجه طالبك في مكان واحد
          </Text>
          <Text style={{ color: '#555', marginTop: 12, fontWeight: 'bold' }}>
            إشراف: حسين كاظم جوده
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setCurrentScreen('home')}>
            <Text style={styles.buttonText}>الدخول إلى المنصة</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // الشاشات المنفصلة
  if (currentScreen !== 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen('home')}>
            <Text style={styles.backButtonText}>← عودة</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {currentScreen === 'books' && '📚 الملازم الدراسية'}
            {currentScreen === 'schedule' && '📅 مواعيد الدروس'}
            {currentScreen === 'groups' && '👥 الكروبات'}
            {currentScreen === 'teachers' && '👨‍🏫 استشارة مدرس'}
            {currentScreen === 'news' && '📰 الأخبار'}
            {currentScreen === 'support' && '💬 الدعم والمساندة'}
          </Text>
        </View>

        <ScrollView style={styles.content}>
          {currentScreen === 'books' && (
            <View style={styles.fullScreenCard}>
              <Text style={styles.cardTitle}>قسم الملازم المتاحة</Text>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• ملزمة الرياضيات - الصف السادس</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• ملزمة اللغة العربية - الشاملة</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• ملزمة الحاسوب والأمن السيبراني</Text>
              </View>
            </View>
          )}

          {currentScreen === 'schedule' && (
            <View style={styles.fullScreenCard}>
              <Text style={styles.cardTitle}>جدول ومواعيد الدروس</Text>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• الأحد: رياضيات (8:00 صباحاً)</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• الثلاثاء: حاسوب (10:00 صباحاً)</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• الخميس: أمن سيبراني (11:30 صباحاً)</Text>
              </View>
            </View>
          )}

          {currentScreen === 'groups' && (
            <View style={styles.fullScreenCard}>
              <Text style={styles.cardTitle}>الكروبات الدراسية</Text>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• كروب قسم الحاسوب</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• كروب قسم الأمن السيبراني</Text>
              </View>
            </View>
          )}

          {currentScreen === 'teachers' && (
            <View style={styles.fullScreenCard}>
              <Text style={styles.cardTitle}>استشارة المدرسين</Text>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• أ. أحمد علي (مدرس الرياضيات)</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• أ. حسين علي (مدرس اللغة العربية)</Text>
              </View>
            </View>
          )}

          {currentScreen === 'news' && (
            <View style={styles.fullScreenCard}>
              <Text style={styles.cardTitle}>آخر الأخبار والتبليغات</Text>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• بدء امتحانات شهر تشرين الأول المقبل.</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>• افتتاح مختبرات قسم الأمن السيبراني الجديد.</Text>
              </View>
            </View>
          )}

          {currentScreen === 'support' && (
            <View style={styles.fullScreenCard}>
              <Text style={styles.cardTitle}>إرسال رسالة للدعم والإدارة</Text>
              <Text style={{ color: '#666', marginBottom: 15 }}>
                اكتب استفسارك أو مشكلتك هنا وسيقوم المشرف بالرد عليك:
              </Text>
              
              <TextInput
                style={styles.messageInput}
                placeholder="اكتب رسالتك هنا..."
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={5}
                value={supportMessage}
                onChangeText={setSupportMessage}
              />

              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendSupport}>
                <Text style={styles.sendButtonText}>إرسال الرسالة 🚀</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // الشاشة الرئيسية (Home Screen)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>منصة المستقبل</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>مرحباً بك في منصة المستقبل 👋</Text>
          <Text style={styles.welcomeText}>اختر القسم الذي تريد الدخول إليه</Text>
        </View>

        <View style={styles.gridContainer}>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setCurrentScreen('books')}>
            <Text style={{ fontSize: 30 }}>📚</Text>
            <Text style={styles.gridText}>الملازم</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setCurrentScreen('schedule')}>
            <Text style={{ fontSize: 30 }}>📅</Text>
            <Text style={styles.gridText}>مواعيد الدروس</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setCurrentScreen('groups')}>
            <Text style={{ fontSize: 30 }}>👥</Text>
            <Text style={styles.gridText}>الكروبات</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setCurrentScreen('teachers')}>
            <Text style={{ fontSize: 30 }}>👨‍🏫</Text>
            <Text style={styles.gridText}>استشارة مدرس</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setCurrentScreen('news')}>
            <Text style={{ fontSize: 30 }}>📰</Text>
            <Text style={styles.gridText}>الأخبار</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setCurrentScreen('support')}>
            <Text style={{ fontSize: 30 }}>💬</Text>
            <Text style={styles.gridText}>الدعم</Text>
          </TouchableOpacity>
        </View>

        {/* خانة المدرسة وأقسامها */}
        <View style={styles.schoolCard}>
          <Text style={{ fontSize: 24, textAlign: 'center' }}>🏫</Text>
          <Text style={styles.schoolName}>
            إعدادية الشهيد أبو مهدي المهندس
          </Text>
          
          <View style={styles.departmentsContainer}>
            <View style={styles.deptBadge}>
              <Text style={styles.deptText}>💻 قسم الحاسبات</Text>
            </View>
            <View style={styles.deptBadge}>
              <Text style={styles.deptText}>🛡️ قسم الأمن السيبراني</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  splashContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e1f5fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  splashTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0288d1',
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 16,
    color: '#555',
  },
  primaryButton: {
    backgroundColor: '#0288d1',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 15,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    padding: 8,
  },
  backButtonText: {
    color: '#0288d1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0288d1',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  welcomeCard: {
    backgroundColor: '#e1f5fe',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0288d1',
  },
  welcomeText: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  gridText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  fullScreenCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0288d1',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e1f5fe',
    paddingBottom: 8,
  },
  itemRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemText: {
    fontSize: 15,
    color: '#333',
  },
  messageInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 14,
    minHeight: 100,
    marginBottom: 15,
  },
  sendButton: {
    backgroundColor: '#0288d1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  schoolCard: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#90caf9',
  },
  schoolName: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1565c0',
    marginTop: 5,
    fontSize: 16,
  },
  departmentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  deptBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#0288d1',
  },
  deptText: {
    color: '#0288d1',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
