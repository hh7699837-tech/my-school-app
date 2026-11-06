import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { createClient } from '@supabase/supabase-js';

// إعداد الاتصال بقاعدة بيانات Supabase
const SUPABASE_URL = 'https://mrimlrxgnromjufqhyga.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaW1scnhnbnJvbWp1ZnFoeWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMTcwODF9.abc';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const goHome = () => setScreen('home');

  // دالة تسجيل الطالب وتخزينه في Supabase
  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert('تنبيه', 'يرجى كتابة اسم الطالب أولاً');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('students').insert([
        {
          full_name: name,
          department: section || 'مهني',
          specialty: specialty || 'الحاسوب وتقنية المعلومات',
        },
      ]);

      if (error) {
        Alert.alert('ملاحظة', 'تم الدخول للمنصة (فشل الربط المؤقت الشبكي)');
      } else {
        Alert.alert('تم بنجاح', 'تم تسجيل بياناتك في قاعدة البيانات بنجاح!');
      }
      setScreen('home');
    } catch (err) {
      setScreen('home');
    } finally {
      setLoading(false);
    }
  };

  if (screen === 'welcome') {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#f0f4f8" />
        <View style={styles.welcomeCard}>
          <Text style={styles.logo}>📚</Text>
          <Text style={styles.title}>منصة المستقبل</Text>
          <Text style={styles.subtitle}>منصة الأستاذ علي صالح</Text>
          <Text style={styles.gray}>تعلم • تابع • تطور</Text>

          <View style={styles.divider} />

          <Text style={styles.creator}>إعداد وإشراف</Text>
          <Text style={styles.creatorName}>حسين كاظم جودة</Text>

          <Button title="ابدأ الآن ✨" onPress={() => setScreen('register')} />
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'register') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <ScrollView contentContainerStyle={styles.page}>
          <Text style={styles.pageTitle}>👨‍🎓 تسجيل الطالب</Text>

          <View style={styles.formCard}>
            <Text style={styles.label}>اسم الطالب الرباعي</Text>
            <TextInput
              style={styles.input}
              placeholder="اكتب اسمك الكامل"
              placeholderTextColor="#94a3b8"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>القسم</Text>
            <TextInput
              style={styles.input}
              placeholder="مثال: مهني"
              placeholderTextColor="#94a3b8"
              value={section}
              onChangeText={setSection}
            />

            <Text style={styles.label}>الاختصاص</Text>
            <TextInput
              style={styles.input}
              placeholder="الحاسوب وتقنية المعلومات"
              placeholderTextColor="#94a3b8"
              value={specialty}
              onChangeText={setSpecialty}
            />

            {loading ? (
              <ActivityIndicator size="large" color="#1769aa" style={{ marginTop: 20 }} />
            ) : (
              <Button title="🚀 دخول إلى المنصة" onPress={handleRegister} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'home') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <ScrollView contentContainerStyle={styles.home}>
          <Text style={styles.homeTitle}>أهلاً بك 👋</Text>
          <Text style={styles.studentName}>{name || 'طالب جديد'}</Text>
          <Text style={styles.gray}>
            {section || 'مهني'} • {specialty || 'الحاسوب وتقنية المعلومات'}
          </Text>

          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>منصة المستقبل</Text>
            <Text style={styles.bannerText}>كل ما يحتاجه الطالب في مكان واحد</Text>
          </View>

          <View style={styles.grid}>
            <Menu icon="📚" title="دوراتي" onPress={() => setScreen('courses')} />
            <Menu icon="📝" title="درجاتي" onPress={() => setScreen('grades')} />
            <Menu icon="🏆" title="الترتيب" onPress={() => setScreen('ranking')} />
            <Menu icon="📁" title="الملفات" onPress={() => setScreen('files')} />
            <Menu icon="📅" title="المواعيد" onPress={() => setScreen('schedule')} />
            <Menu icon="📢" title="الإعلانات" onPress={() => setScreen('news')} />
            <Menu icon="💬" title="الدعم" onPress={() => setScreen('support')} />
            <Menu icon="👤" title="حسابي" onPress={() => setScreen('profile')} />
          </View>

          <Text style={styles.footer}>منصة الأستاذ علي صالح</Text>
          <Text style={styles.small}>إعداد وإشراف حسين كاظم جودة</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'grades') {
    return (
      <Page title="📝 درجاتي" back={goHome}>
        <Text style={styles.description}>نتائج الامتحانات الفصلية واليومية</Text>

        <Card>
          <Text style={styles.cardTitle}>اللغة الإنجليزية</Text>
          <Text style={styles.cardSub}>امتحان اليوم</Text>
          <Text style={styles.cardDate}>📅 03 / 10 / 2026</Text>
          <Text style={styles.grade}>85 / 100</Text>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>الحاسوب</Text>
          <Text style={styles.cardSub}>امتحان الفصل الأول</Text>
          <Text style={styles.cardDate}>📅 01 / 10 / 2026</Text>
          <Text style={styles.grade}>92 / 100</Text>
        </Card>
      </Page>
    );
  }

  if (screen === 'courses') {
    return (
      <Page title="📚 دوراتي" back={goHome}>
        <Card>
          <Text style={styles.cardTitle}>الحاسوب وتقنية المعلومات</Text>
          <Text style={styles.grayText}>الدروس والمواد الخاصة بالاختصاص.</Text>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>اللغة الإنجليزية</Text>
          <Text style={styles.grayText}>دروس ومراجعات اللغة الإنجليزية.</Text>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>مواد إضافية</Text>
          <Text style={styles.grayText}>سيتم إضافة المواد من الإدارة قريباً.</Text>
        </Card>
      </Page>
    );
  }

  if (screen === 'ranking') {
    return (
      <Page title="🏆 الترتيب" back={goHome}>
        <Rank text="🥇 أحمد علي — 96%" />
        <Rank text="🥈 محمد حسن — 94%" />
        <Rank text="🥉 حسين كاظم — 92%" />
        <Rank text="4️⃣ علي كريم — 89%" />
        <Rank text="5️⃣ مصطفى أحمد — 87%" />
      </Page>
    );
  }

  if (screen === 'files') {
    return (
      <Page title="📁 الملفات" back={goHome}>
        <File title="ملزمة الحاسوب الشاملة" />
        <File title="ملزمة اللغة الإنجليزية" />
        <File title="تجميع أسئلة الحاسوب" />
        <File title="ملفات وملازم إضافية" />
      </Page>
    );
  }

  if (screen === 'schedule') {
    return (
      <Page title="📅 المواعيد" back={goHome}>
        <Card>
          <Text style={styles.cardTitle}>الأحد</Text>
          <Text style={styles.grayText}>الحاسوب — 10:00 صباحاً</Text>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>الاثنين</Text>
          <Text style={styles.grayText}>اللغة الإنجليزية — 12:00 ظهراً</Text>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>الأربعاء</Text>
          <Text style={styles.grayText}>مراجعة عامة — 10:00 صباحاً</Text>
        </Card>
      </Page>
    );
  }

  if (screen === 'news') {
    return (
      <Page title="📢 الإعلانات" back={goHome}>
        <Card>
          <Text style={styles.cardTitle}>إعلان مهم 📌</Text>
          <Text style={styles.grayText}>سيتم نشر مواعيد الامتحانات الجديدة هنا.</Text>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>دروس جديدة 🎥</Text>
          <Text style={styles.grayText}>تمت إضافة مواد ودروس جديدة في قسم الدورة.</Text>
        </Card>

        <Card>
          <Text style={styles.cardTitle}>تنبيه للطلاب 🔔</Text>
          <Text style={styles.grayText}>يرجى متابعة المنصة باستمرار للتحديثات.</Text>
        </Card>
      </Page>
    );
  }

  if (screen === 'support') {
    return (
      <Page title="💬 الدعم" back={goHome}>
        <Text style={styles.description}>اكتب رسالتك إلى إدارة المنصة مباشرة</Text>

        <TextInput
          style={styles.message}
          placeholder="اكتب رسالتك هنا..."
          placeholderTextColor="#94a3b8"
          multiline
          value={message}
          onChangeText={setMessage}
        />

        <Button
          title="إرسال الرسالة 📩"
          onPress={() => {
            if (!message.trim()) {
              Alert.alert('تنبيه', 'اكتب الرسالة أولاً');
              return;
            }
            Alert.alert('تم الإرسال', 'تم إرسال رسالتك إلى فريق الدعم بنجاح.');
            setMessage('');
          }}
        />
      </Page>
    );
  }

  if (screen === 'profile') {
    return (
      <Page title="👤 حسابي" back={goHome}>
        <Card style={{ alignItems: 'center' }}>
          <Text style={styles.profileIcon}>👤</Text>
          <Text style={styles.profileName}>{name || 'طالب جديد'}</Text>
          <Text style={styles.profileDetail}>القسم: {section || 'مهني'}</Text>
          <Text style={styles.profileDetail}>
            الاختصاص: {specialty || 'الحاسوب وتقنية المعلومات'}
          </Text>
        </Card>

        <Button title="✏️ تعديل البيانات" onPress={() => setScreen('edit')} />

        <TouchableOpacity style={styles.logout} onPress={() => setScreen('welcome')}>
          <Text style={styles.logoutText}>تسجيل الخروج 🚪</Text>
        </TouchableOpacity>
      </Page>
    );
  }

  if (screen === 'edit') {
    return (
      <Page title="✏️ تعديل البيانات" back={() => setScreen('profile')}>
        <View style={styles.formCard}>
          <Text style={styles.label}>الاسم</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>القسم</Text>
          <TextInput style={styles.input} value={section} onChangeText={setSection} />

          <Text style={styles.label}>الاختصاص</Text>
          <TextInput style={styles.input} value={specialty} onChangeText={setSpecialty} />

          <Button
            title="حفظ البيانات 💾"
            onPress={() => {
              Alert.alert('تم الحفظ', 'تم تحديث البيانات بنجاح.');
              setScreen('profile');
            }}
          />
        </View>
      </Page>
    );
  }

  return null;
}

function Page({ title, back, children }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <ScrollView contentContainerStyle={styles.page}>
        <TouchableOpacity style={styles.back} onPress={back}>
          <Text style={styles.backText}>← رجوع</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>{title}</Text>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function Menu({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.menu} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function Rank({ text }) {
  return (
    <View style={styles.rank}>
      <Text style={styles.rankText}>{text}</Text>
    </View>
  );
}

function File({ title }) {
  return (
    <TouchableOpacity
      style={styles.file}
      onPress={() => Alert.alert('تحميل الملف', 'سيتم فتح الملف تلقائياً.')}
      activeOpacity={0.7}
    >
      <Text style={styles.fileIcon}>📄</Text>
      <Text style={styles.fileTitle}>{title}</Text>
      <Text style={styles.open}>فتح</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  welcomeCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  logo: { fontSize: 75, marginBottom: 10 },
  title: { fontSize: 32, fontWeight: '800', color: '#1e293b', textAlign: 'center' },
  subtitle: { fontSize: 20, fontWeight: '600', color: '#1769aa', marginTop: 6 },
  gray: { color: '#64748b', fontSize: 15, marginTop: 6, textAlign: 'center' },
  divider: { width: '80%', height: 1, backgroundColor: '#e2e8f0', marginVertical: 20 },
  creator: { color: '#94a3b8', fontSize: 14 },
  creatorName: { fontSize: 18, fontWeight: '700', color: '#334155', marginTop: 4, marginBottom: 20 },

  page: { padding: 20, paddingTop: 30, paddingBottom: 40 },
  home: { padding: 20, paddingTop: 30, paddingBottom: 40, alignItems: 'center' },

  pageTitle: { fontSize: 26, fontWeight: '800', color: '#0f172a', textAlign: 'center', marginBottom: 20 },
  homeTitle: { fontSize: 26, fontWeight: '800', color: '#0f172a' },
  studentName: { fontSize: 22, fontWeight: '700', color: '#1769aa', marginTop: 4 },

  banner: {
    width: '100%',
    backgroundColor: '#1769aa',
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
    marginBottom: 25,
    elevation: 3,
  },
  bannerTitle: { color: '#ffffff', fontSize: 24, fontWeight: '800', textAlign: 'center' },
  bannerText: { color: '#e0f2fe', textAlign: 'center', marginTop: 6, fontSize: 15 },

  grid: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  menu: {
    width: '48%',
    height: 115,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  menuIcon: { fontSize: 36 },
  menuTitle: { fontSize: 16, fontWeight: '700', color: '#334155', marginTop: 6 },

  button: {
    backgroundColor: '#1769aa',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
    elevation: 2,
  },
  buttonText: { color: '#ffffff', fontSize: 17, fontWeight: '700' },

  back: { alignSelf: 'flex-start', marginBottom: 15, paddingVertical: 5 },
  backText: { color: '#1769aa', fontSize: 16, fontWeight: '700' },

  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  label: { fontSize: 15, fontWeight: '700', color: '#334155', textAlign: 'right', marginTop: 12, marginBottom: 6 },
  input: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8fafc',
    textAlign: 'right',
    color: '#0f172a',
  },

  description: { textAlign: 'center', color: '#64748b', fontSize: 15, marginBottom: 20 },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 4, textAlign: 'right' },
  cardSub: { color: '#64748b', textAlign: 'right', fontSize: 14 },
  cardDate: { color: '#94a3b8', textAlign: 'right', fontSize: 13, marginTop: 4 },
  grayText: { color: '#64748b', textAlign: 'right', fontSize: 15, marginTop: 4 },
  grade: { fontSize: 20, fontWeight: '800', color: '#1769aa', marginTop: 8, textAlign: 'right' },

  rank: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  rankText: { fontSize: 17, fontWeight: '700', color: '#334155', textAlign: 'right' },

  file: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  fileIcon: { fontSize: 28, marginRight: 12 },
  fileTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#334155', textAlign: 'right' },
  open: { color: '#1769aa', fontWeight: '700', fontSize: 15 },

  message: {
    width: '100%',
    height: 140,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#ffffff',
    textAlign: 'right',
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#0f172a',
  },

  profileIcon: { fontSize: 60, textAlign: 'center', marginBottom: 10 },
  profileName: { fontSize: 22, fontWeight: '800', color: '#0f172a', textAlign: 'center' },
  profileDetail: { fontSize: 15, color: '#64748b', textAlign: 'center', marginTop: 4 },

  logout: {
    backgroundColor: '#fee2e2',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: '#dc2626' },

  footer: { color: '#64748b', marginTop: 20, fontSize: 15, fontWeight: '600' },
  small: { color: '#94a3b8', marginTop: 4, fontSize: 13 },
});
