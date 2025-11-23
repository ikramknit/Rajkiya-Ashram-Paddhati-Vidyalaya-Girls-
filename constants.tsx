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
    "https://picsum.photos/id/202/1920/1080",
    "https://picsum.photos/id/237/1920/1080",
    "https://picsum.photos/id/129/1920/1080"
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
  hi: "राजकीय आश्रम पद्धति विद्यालय (बालिका), पुनवारका, सहारनपुर का निर्माण 2008 में शुरू हुआ और विद्यालय 2011 में संचालित हुआ। कुल छात्र क्षमता 490 है। यह विद्यालय सामाजिक और आर्थिक रूप से कमजोर वर्गों और शैक्षिक रूप से वंचित ग्रामीण और शहरी क्षेत्रों की लड़कियों को शिक्षा, मुफ्त वर्दी, आवास, दैनिक आवश्यक वस्तुएं, अध्ययन सामग्री, खेल और कंप्यूटर सुविधाएं प्रदान करता है।"
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
    title: { en: "Smart Class (Digital Education)", hi: "डिजिटल शिक्षा (स्मार्ट क्लास)" },
    description: { 
      en: "Equipped with projectors, tablet labs, and computer labs. Khan Academy & Embibe learning.", 
      hi: "प्रोजेक्टर, टैबलेट लैब और कंप्यूटर लैब से सुसज्जित। खान अकादमी और एम्बाइब से शिक्षा।"
    },
    icon: <Monitor className="w-6 h-6" />,
    image: "https://picsum.photos/id/1/800/600"
  },
  {
    id: 2,
    title: { en: "Morning Yoga & Prayer", hi: "सुबह का योग और प्रार्थना" },
    description: {
      en: "Daily activities include prayers, poems, news, and physical training.",
      hi: "दैनिक गतिविधियों में प्रार्थना, कविता, समाचार और शारीरिक प्रशिक्षण शामिल हैं।"
    },
    icon: <Activity className="w-6 h-6" />,
    image: "https://picsum.photos/id/73/800/600"
  },
  {
    id: 3,
    title: { en: "Hostel Facilities", hi: "छात्रावास की सुविधा" },
    description: {
      en: "Residential school with separate hostels for girls. Capacity: 490.",
      hi: "लड़कियों के लिए अलग छात्रावास के साथ आवासीय विद्यालय। क्षमता: 490।"
    },
    icon: <Home className="w-6 h-6" />,
    image: "https://picsum.photos/id/129/800/600"
  },
  {
    id: 4,
    title: { en: "Mess Arrangements", hi: "भोजन व्यवस्था" },
    description: {
      en: "Well-organized mess with nutritious food and fixed menu.",
      hi: "पौष्टिक भोजन और निश्चित मेनू के साथ सुव्यवस्थित मेस।"
    },
    icon: <Utensils className="w-6 h-6" />,
    image: "https://picsum.photos/id/429/800/600"
  },
  {
    id: 5,
    title: { en: "Laboratories", hi: "प्रयोगशालाएं" },
    description: {
      en: "Biology, Physics, and Chemistry laboratories available.",
      hi: "जीव विज्ञान, भौतिकी और रसायन विज्ञान प्रयोगशालाएँ उपलब्ध हैं।"
    },
    icon: <FlaskConical className="w-6 h-6" />,
    image: "https://picsum.photos/id/20/800/600"
  },
  {
    id: 6,
    title: { en: "Library", hi: "पुस्तकालय" },
    description: {
      en: "Available to develop reading habits and enhance knowledge.",
      hi: "पढ़ने की आदत विकसित करने और ज्ञान बढ़ाने के लिए उपलब्ध।"
    },
    icon: <BookOpen className="w-6 h-6" />,
    image: "https://picsum.photos/id/24/800/600"
  },
  {
    id: 7,
    title: { en: "Health Checkup", hi: "स्वास्थ्य परीक्षण" },
    description: {
      en: "Periodic health checkup camps organized by Community Health Center.",
      hi: "सामुदायिक स्वास्थ्य केंद्र द्वारा समय-समय पर स्वास्थ्य परीक्षण शिविर।"
    },
    icon: <HeartPulse className="w-6 h-6" />,
    image: "https://picsum.photos/id/338/800/600"
  },
  {
    id: 8,
    title: { en: "Environment", hi: "पर्यावरण" },
    description: {
      en: "Tree plantation and Cleanliness Campaigns.",
      hi: "वृक्षारोपण एवं स्वच्छता अभियान।"
    },
    icon: <TreePine className="w-6 h-6" />,
    image: "https://picsum.photos/id/1047/800/600"
  }
];

export const STAFF_DATA: StaffMember[] = [
  { id: 1, name: { en: "Dr. Madhu Rani", hi: "डॉ. मधु रानी" }, designation: { en: "In-charge Principal", hi: "प्रभारी प्रधानाचार्य" }, subject: { en: "Sociology", hi: "समाजशास्त्र" } },
  { id: 2, name: { en: "Mrs. Bhavna Madan", hi: "श्रीमती भावना मदान" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "", hi: "" } },
  { id: 3, name: { en: "Mr. Arvind Rai", hi: "श्री अरविंद राय" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "", hi: "" } },
  { id: 4, name: { en: "Mrs. Nidhi Rana", hi: "श्रीमती निधि राणा" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "", hi: "" } },
  { id: 5, name: { en: "Ms. Anju", hi: "सुश्री अंजू" }, designation: { en: "Lecturer", hi: "प्रवक्ता" }, subject: { en: "", hi: "" } },
  { id: 6, name: { en: "Mrs. Manu", hi: "श्रीमती मनु" }, designation: { en: "Assistant Teacher", hi: "सहायक अध्यापक" }, subject: { en: "", hi: "" } },
  { id: 7, name: { en: "Mrs. Kavita", hi: "श्रीमती कविता" }, designation: { en: "Assistant Teacher", hi: "सहायक अध्यापक" }, subject: { en: "", hi: "" } },
  { id: 8, name: { en: "Mrs. Aarti Mahajan", hi: "श्रीमती आरती महाजन" }, designation: { en: "Assistant Teacher", hi: "सहायक अध्यापक" }, subject: { en: "", hi: "" } },
  { id: 9, name: { en: "Mrs. Neha Devi", hi: "श्रीमती नेहा देवी" }, designation: { en: "Assistant Teacher", hi: "सहायक अध्यापक" }, subject: { en: "", hi: "" } }
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