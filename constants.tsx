import React from 'react';
import type { YearResult, StaffMember, FacultyStream, Facility, BilingualText, EventItem, NewsItem, SiteConfig } from './types';
import { Monitor, BookOpen, FlaskConical, Home, Utensils, Activity, HeartPulse, TreePine } from 'lucide-react';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  schoolName: {
    en: "Rajkiya Ashram Paddhati Vidyalaya (Girls)",
    hi: "राजकीय आश्रम पद्धति विद्यालय (बालिका)"
  },
  subTitle: {
    en: "Punwarka, Saharanpur",
    hi: "पुनवारका, सहारनपुर"
  },
  address: {
    en: "Punwarka, Saharanpur, Uttar Pradesh",
    hi: "पुनवारका, सहारनपुर, उत्तर प्रदेश"
  },
  phone: "+91 123 456 7890",
  email: "contact@rapv-punwarka.in",
  heroImages: [
    "https://picsum.photos/id/20/1920/1080",
    "https://picsum.photos/id/175/1920/1080",
    "https://picsum.photos/id/1060/1920/1080"
  ],
  aboutImage: "https://picsum.photos/id/237/600/800",
  logo: ""
};

export const SCHOOL_NAME: BilingualText = DEFAULT_SITE_CONFIG.schoolName;
export const SCHOOL_NAME_SUB: BilingualText = DEFAULT_SITE_CONFIG.subTitle;
export const ADDRESS: BilingualText = DEFAULT_SITE_CONFIG.address;

export const DEPARTMENT: BilingualText = {
  en: "Samaj Kalyan Vibhag, Uttar Pradesh",
  hi: "समाज कल्याण विभाग, उत्तर प्रदेश"
};

export const INTRO_TEXT: BilingualText = {
  en: "The construction of Rajkiya Ashram Paddhati Vidyalaya (Girls), Punwarka, Saharanpur began in 2008 and the school became operational in 2011. The total student capacity is 490. This school provides education, free uniforms, accommodation, daily essentials, study materials, sports, and computer facilities to girls from socially and economically weaker sections, and educationally deprived rural and urban areas.",
  hi: "राजकीय आश्रम पद्धति विद्यालय (बालिका), पुनवारका, सहारनपुर का निर्माण 2008 में शुरू हुआ और विद्यालय 2011 में संचालित हुआ। विद्यालय की कुल छात्र क्षमता 490 है। यह विद्यालय केवल सामाजिक, आर्थिक दृष्टि से कमजोर व शिक्षा से वंचित, ग्रामीण और शहरी क्षेत्रों की बालिकाओं को शिक्षा के साथ-साथ निशुल्क यूनिफार्म, आवास, दैनिक प्रयोग की सभी वस्तुए, अध्ययन लेखन सामग्री, गणवेश, खेलकूद व कम्प्यूटर की सुविधा उपलब्ध कराता है।"
};

export const UI_LABELS = {
  home: { en: "Home", hi: "मुख्य पृष्ठ" },
  about: { en: "About", hi: "परिचय" },
  facilities: { en: "Facilities", hi: "सुविधाएं" },
  faculty: { en: "Faculty", hi: "स्टाफ" },
  results: { en: "Results", hi: "परीक्षाफल" },
  events: { en: "Events", hi: "कार्यक्रम" },
  news: { en: "Latest News & Updates", hi: "ताजा समाचार और अपडेट" },
  readMore: { en: "Read More", hi: "और पढ़ें" },
  close: { en: "Close", hi: "बंद करें" },
  postedOn: { en: "Posted on", hi: "प्रकाशित तिथि" },
  discoverMore: { en: "Discover More", hi: "और जानें" },
  aboutUs: { en: "About Us", hi: "हमारे बारे में" },
  aboutTitle: { en: "Empowering Girls Through Education", hi: "शिक्षा के माध्यम से बालिकाओं का सशक्तिकरण" },
  established: { en: "Established", hi: "स्थापना" },
  capacity: { en: "Student Capacity", hi: "छात्र क्षमता" },
  infrastructure: { en: "Infrastructure", hi: "इंफ्रास्ट्रक्चर" },
  facilitiesTitle: { en: "World-Class Facilities", hi: "विश्व स्तरीय सुविधाएं" },
  facilitiesSub: { en: "We provide a nurturing environment with modern amenities to support both academic and physical growth.", hi: "हम शैक्षणिक और शारीरिक विकास का समर्थन करने के लिए आधुनिक सुविधाओं के साथ एक पोषण वातावरण प्रदान करते हैं।" },
  ourStaff: { en: "Our Dedicated Staff", hi: "हमारे समर्पित कर्मचारी" },
  academicStreams: { en: "Academic Streams", hi: "शैक्षणिक संकाय" },
  performance: { en: "Performance", hi: "प्रदर्शन" },
  academicExcellence: { en: "Academic Excellence", hi: "शैक्षणिक उत्कृष्टता" },
  passTrend: { en: "Pass Percentage Trend", hi: "उत्तीर्ण प्रतिशत रुझान" },
  class10: { en: "Class 10 Results", hi: "कक्षा 10 परिणाम" },
  class12: { en: "Class 12 Results", hi: "कक्षा 12 परिणाम" },
  total: { en: "Total", hi: "कुल" },
  passed: { en: "Passed", hi: "उत्तीर्ण" },
  rate: { en: "Rate", hi: "प्रतिशत" },
  toppers: { en: "Toppers", hi: "टॉपर्स" },
  noData: { en: "No data available", hi: "डेटा उपलब्ध नहीं है" },
  lifeAtCampus: { en: "Life at Campus", hi: "परिसर में जीवन" },
  lifeSub: { en: "A glimpse into our daily activities and special occasions", hi: "हमारी दैनिक गतिविधियों और विशेष अवसरों की एक झलक" },
  contactUs: { en: "Contact Us", hi: "संपर्क करें" },
  quickLinks: { en: "Quick Links", hi: "त्वरित लिंक" },
  rightsReserved: { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },
  govtInitiative: { en: "A government initiative dedicated to providing quality education and holistic development for students from underprivileged backgrounds.", hi: "वंचित पृष्ठभूमि के छात्रों के लिए गुणवत्तापूर्ण शिक्षा और समग्र विकास प्रदान करने के लिए समर्पित एक सरकारी पहल।" },
  name: { en: "Name", hi: "नाम" },
  designation: { en: "Designation", hi: "पदनाम" },
  subject: { en: "Subject", hi: "विषय" }
};

export const NEWS_DATA: NewsItem[] = [
  { 
    id: 1, 
    text: { en: "Pariksha Pe Charcha: Student Dikshita won first place", hi: "परीक्षा पे चर्चा: छात्रा दीक्षिता ने प्रथम स्थान प्राप्त किया" }, 
    content: { 
      en: "Student Dikshita won first place in a poster competition at PM Shri Kendriya Vidyalaya Air Force Sarsawa.", 
      hi: "पीएम श्री केंद्रीय विद्यालय वायु सेना सरसावा में पोस्टर प्रतियोगिता में छात्रा दीक्षिता ने प्रथम स्थान प्राप्त किया।" 
    },
    date: "2024-03-01",
    image: "https://picsum.photos/id/20/600/400"
  }
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: 1,
    title: { en: "Morning Yoga & Prayer", hi: "प्रात: कालीन योगा एवं प्रार्थना स्थल" },
    description: {
      en: "Daily activities include different prayers, poems, stories, news, and physical training at the morning yoga and prayer venue.",
      hi: "विद्यालय के प्रात: कालीन योगा एवं प्रार्थना स्थल पर प्रतिदिन अलग-2 प्रार्थना, कविता, कहानी, समाचार एवं पी०टी० कराई जाती है"
    },
    icon: <Activity className="w-6 h-6" />,
    image: "https://picsum.photos/id/73/800/600"
  },
  {
    id: 2,
    title: { en: "Smart Class (Digital Education)", hi: "डिजिटल शिक्षा (स्मार्ट क्लास)" },
    description: { 
      en: "Modern education via projectors, tablet labs, and computer labs. Khan Academy, Embibe, and Phoolwari Project included.", 
      hi: "डिजिटल शिक्षा के अंतर्गत छात्राओं को प्रोजेक्टर, टैब लैब एवं कंप्यूटर लैब में आधुनिक शिक्षा प्रदान की जाती है। खान एकेडमी, एमबाइब, इंग्लिश लिट्रेसी प्रोग्राम संचालित।"
    },
    icon: <Monitor className="w-6 h-6" />,
    image: "https://picsum.photos/id/1/800/600"
  },
  {
    id: 3,
    title: { en: "Classrooms", hi: "कक्षाएँ" },
    description: {
      en: "Classrooms are well-ventilated, equipped with electricity, fans, and lights.",
      hi: "कक्षाएं हवादार, विद्युत्, पंखे, बत्ती युक्त हैं।"
    },
    icon: <Home className="w-6 h-6" />,
    image: "https://picsum.photos/id/201/800/600"
  },
  {
    id: 4,
    title: { en: "Library", hi: "पुस्तकालय" },
    description: {
      en: "A library is available to develop reading habits and enhance knowledge among students.",
      hi: "छात्राओं में किताबे पढने की आदत को विकसित करने एवं ज्ञानवर्धन के लिए पुस्तकालय की व्यवस्था है"
    },
    icon: <BookOpen className="w-6 h-6" />,
    image: "https://picsum.photos/id/24/800/600"
  },
  {
    id: 5,
    title: { en: "Laboratories", hi: "प्रयोगशाला" },
    description: {
      en: "The school has biology, physics, and chemistry laboratories.",
      hi: "विद्यालय में जीव विज्ञान, भौतिक विज्ञान, रसायन विज्ञान प्रयोगशाला की व्यवस्था है।"
    },
    icon: <FlaskConical className="w-6 h-6" />,
    image: "https://picsum.photos/id/20/800/600"
  },
  {
    id: 6,
    title: { en: "Hostel Facilities", hi: "आवासीय व्यवस्था" },
    description: {
      en: "Residential school with separate hostels for girls with a total capacity of 490.",
      hi: "विद्यालय का स्वरूप आवासीय होने के कारण विद्यालय में निर्मित छात्रावास पृथक रूप से बालिकाओं के लिए उपलब्ध है। छात्रावास की कुल क्षमता 490 हैं।"
    },
    icon: <Home className="w-6 h-6" />,
    image: "https://picsum.photos/id/129/800/600"
  },
  {
    id: 7,
    title: { en: "Mess Arrangements", hi: "मेस व्यवस्था" },
    description: {
      en: "Well-organized mess with fixed menu and mess committee to ensure quality.",
      hi: "विद्यालय में निर्धारित मेन्यू के अनुसार सुव्यवस्थित मेस व्यवस्था सुनिश्चित है। मेस कमेटी द्वारा शुद्ध एवं पौष्टिक भोजन की व्यवस्था।"
    },
    icon: <Utensils className="w-6 h-6" />,
    image: "https://picsum.photos/id/429/800/600"
  },
  {
    id: 8,
    title: { en: "Health Checkup", hi: "स्वास्थ्य परीक्षण" },
    description: {
      en: "Periodic health checkup camps organized by the Community Health Center.",
      hi: "विद्यालय में सामुदायिक स्वास्थ्य केंद्र पुंवारका द्वारा छात्राओं के स्वास्थ्य परीक्षण हेतु समय समय पर शिविर लगाया जाता है"
    },
    icon: <HeartPulse className="w-6 h-6" />,
    image: "https://picsum.photos/id/338/800/600"
  }
];

export const STAFF_DATA: StaffMember[] = [
  { id: 1, name: { en: "Dr. Madhu Rani", hi: "डॉ मधु रानी" }, designation: { en: "In-charge Principal", hi: "प्र० प्रधानाचार्य" }, subject: { en: "Sociology", hi: "समाजशास्त्र" } },
  { id: 2, name: { en: "Mrs. Bhavna Madan", hi: "श्रीमती भावना मदान" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "Economics", hi: "अर्थशास्त्र" } },
  { id: 3, name: { en: "Mr. Arvind Rai", hi: "श्री अरविन्द राय" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "Hindi", hi: "हिंदी" } },
  { id: 4, name: { en: "Mrs. Nidhi Rana", hi: "श्रीमती निधि राणा" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "History", hi: "इतिहास" } },
  { id: 5, name: { en: "Ms. Anju", hi: "कु० अंजू" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "Biology", hi: "जीव विज्ञान" } },
  { id: 6, name: { en: "Mrs. Manu", hi: "श्रीमती मनु" }, designation: { en: "Assistant Teacher", hi: "सहायक अध्या०" }, subject: { en: "Hindi", hi: "हिंदी" } },
  { id: 7, name: { en: "Mrs. Kavita", hi: "श्रीमती कविता" }, designation: { en: "Assistant Teacher", hi: "सहायक अध्या०" }, subject: { en: "Social Science", hi: "सामा० विज्ञान" } },
  { id: 8, name: { en: "Mrs. Aarti Mahajan", hi: "श्रीमती आरती महाजन" }, designation: { en: "Assistant Teacher", hi: "सहायक अध्या०" }, subject: { en: "English", hi: "अंग्रेजी" } },
  { id: 9, name: { en: "Mrs. Neha Devi", hi: "श्रीमती नेहा देवी" }, designation: { en: "Assistant Teacher", hi: "सहायक अध्या०" }, subject: { en: "Art", hi: "कला" } }
];

export const FACULTY_STREAMS: FacultyStream[] = [
  { 
    name: { en: "Arts Faculty", hi: "कला संकाय" }, 
    subjects: [
      { en: "Hindi", hi: "हिंदी" },
      { en: "English", hi: "अंग्रेजी" },
      { en: "Sociology", hi: "समाजशास्त्र" },
      { en: "Economics", hi: "अर्थशास्त्र" },
      { en: "History", hi: "इतिहास" },
      { en: "Physical Education", hi: "शारीरिक शिक्षा" }
    ] 
  },
  { 
    name: { en: "Science Faculty", hi: "विज्ञान संकाय" }, 
    subjects: [
      { en: "Physics", hi: "भौतिक विज्ञान" },
      { en: "Chemistry", hi: "रसायन विज्ञान" },
      { en: "Biology", hi: "जीव विज्ञान" }
    ] 
  }
];

export const EVENTS_DATA: EventItem[] = [
  { 
    id: 1,
    title: { en: "Minister Visit", hi: "मंत्री का दौरा" }, 
    desc: { en: "Shri Asim Arun visited the school", hi: "श्री असीम अरुण ने विद्यालय का दौरा किया" }, 
    img: "https://picsum.photos/id/1060/400/300" 
  }
];

export const EXAM_RESULTS: YearResult[] = [
  {
    year: "2023-24",
    class10: { totalStudents: 40, passed: 30, failed: 9, passPercentage: 89.29, toppers: [{ rank: 1, name: "Priyanshi", percentage: "77.0" }, { rank: 2, name: "Neetu", percentage: "70.8" }, { rank: 3, name: "Angel", percentage: "68.8" }] },
    class12: { totalStudents: 27, passed: 27, failed: 0, passPercentage: 100, toppers: [{ rank: 1, name: "Preeti", percentage: "82.8" }, { rank: 2, name: "Anchal Singh", percentage: "81.1" }, { rank: 3, name: "Priyanka", percentage: "77.3" }] }
  }
];
