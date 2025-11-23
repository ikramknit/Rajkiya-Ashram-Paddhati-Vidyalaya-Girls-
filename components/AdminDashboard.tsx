import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Trash2, Calendar, BarChart, Save, Image as ImageIcon, Users, Bell, Edit2, X, Upload, Building2, Copy, Check, RefreshCw, Loader, Settings, GripVertical } from 'lucide-react';
import type { EventItem, YearResult, Facility, StaffMember, NewsItem, SiteConfig } from '../types';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

interface AdminDashboardProps {
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
  examResults: YearResult[];
  setExamResults: React.Dispatch<React.SetStateAction<YearResult[]>>;
  facilities: Facility[];
  setFacilities: React.Dispatch<React.SetStateAction<Facility[]>>;
  staff: StaffMember[];
  setStaff: React.Dispatch<React.SetStateAction<StaffMember[]>>;
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  events, setEvents,
  examResults, setExamResults,
  facilities, setFacilities,
  staff, setStaff,
  news, setNews,
  siteConfig, setSiteConfig,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'results' | 'media' | 'staff' | 'news' | 'facilities' | 'settings'>('events');
  const [uploading, setUploading] = useState(false);
  const [globalUploadUrl, setGlobalUploadUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Gallery State
  const [galleryImages, setGalleryImages] = useState<{name: string, url: string}[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);

  // Editing States
  const [editingEventIndex, setEditingEventIndex] = useState<number | null>(null);
  const [editingStaffId, setEditingStaffId] = useState<number | null>(null);
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [editingFacilityId, setEditingFacilityId] = useState<number | null>(null);
  const [editingResultYear, setEditingResultYear] = useState<string | null>(null);

  // Forms State
  const [newEvent, setNewEvent] = useState({ titleEn: '', titleHi: '', descEn: '', descHi: '', img: '' });
  const [newResult, setNewResult] = useState({ year: '', class10Total: '', class10Pass: '', class10Percent: '', class12Total: '', class12Pass: '', class12Percent: '' });
  const [newStaff, setNewStaff] = useState({ nameEn: '', nameHi: '', designationEn: '', designationHi: '', subjectEn: '', subjectHi: '', photo: '' });
  const [newNews, setNewNews] = useState({ textEn: '', textHi: '', contentEn: '', contentHi: '', image: '', date: '' });
  const [newFacility, setNewFacility] = useState({ titleEn: '', titleHi: '', descEn: '', descHi: '', image: '' });

  // Fetch Gallery Images
  const fetchGalleryImages = async () => {
    if (!isSupabaseConfigured()) return;
    setLoadingGallery(true);
    try {
      const { data, error } = await supabase.storage.from('punwarkaschoolBucket').list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });
      
      if (error) {
        console.error('Error fetching gallery:', error);
      } else if (data) {
        const images = data
          .filter(file => file.name !== '.emptyFolderPlaceholder') 
          .map(file => {
          const { data: { publicUrl } } = supabase.storage.from('punwarkaschoolBucket').getPublicUrl(file.name);
          return { name: file.name, url: publicUrl };
        });
        setGalleryImages(images);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingGallery(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'media') {
      fetchGalleryImages();
    }
  }, [activeTab]);

  // Helper: Upload Image
  const handleImageUpload = async (file: File): Promise<string | null> => {
    if (!isSupabaseConfigured()) {
      alert("Supabase Credentials missing in supabaseClient.ts");
      return null;
    }
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('punwarkaschoolBucket')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('punwarkaschoolBucket')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image: ', error);
      alert('Error uploading image!');
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Helper: Delete Image
  const handleDeleteImage = async (imageName: string) => {
    if(!window.confirm("Are you sure you want to delete this image? If it is used on the website, the link will break.")) return;
    try {
      const { error } = await supabase.storage.from('punwarkaschoolBucket').remove([imageName]);
      if (error) throw error;
      fetchGalleryImages(); // Refresh
    } catch (error) {
      alert("Error deleting image");
      console.error(error);
    }
  };

  // Helper: Rename Image (Edit)
  const handleRenameImage = async (oldName: string) => {
    const newName = prompt("Enter new filename (keep the extension, e.g., image.jpg):", oldName);
    if(!newName || newName === oldName) return;

    try {
        const { error } = await supabase.storage.from('punwarkaschoolBucket').move(oldName, newName);
        if(error) throw error;
        fetchGalleryImages(); // Refresh
    } catch (error) {
        alert("Error renaming image. Ensure the name is unique.");
        console.error(error);
    }
  };

  // Helper: Copy to Clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- EVENTS Handlers ---
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      title: { en: newEvent.titleEn, hi: newEvent.titleHi },
      desc: { en: newEvent.descEn, hi: newEvent.descHi },
      img: newEvent.img || 'https://picsum.photos/400/300'
    };

    if (isSupabaseConfigured()) {
      const dbPayload = {
        title_en: newEvent.titleEn, title_hi: newEvent.titleHi,
        desc_en: newEvent.descEn, desc_hi: newEvent.descHi,
        img: eventData.img
      };
      
      if (editingEventIndex !== null && events[editingEventIndex].id) {
         await supabase.from('punwarka_events').update(dbPayload).eq('id', events[editingEventIndex].id);
      } else {
         await supabase.from('punwarka_events').insert([dbPayload]);
      }
    }

    if (editingEventIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editingEventIndex] = { ...events[editingEventIndex], ...eventData };
      setEvents(updatedEvents);
      setEditingEventIndex(null);
    } else {
      setEvents([...events, eventData]);
    }
    setNewEvent({ titleEn: '', titleHi: '', descEn: '', descHi: '', img: '' });
  };

  const handleEditEvent = (index: number) => {
    const event = events[index];
    setNewEvent({
      titleEn: event.title.en, titleHi: event.title.hi,
      descEn: event.desc.en, descHi: event.desc.hi,
      img: event.img
    });
    setEditingEventIndex(index);
  };

  const handleDeleteEvent = async (index: number) => {
    if (window.confirm('Delete this event?')) {
      if (isSupabaseConfigured() && events[index].id) {
         await supabase.from('punwarka_events').delete().eq('id', events[index].id);
      }
      setEvents(events.filter((_, i) => i !== index));
      if (editingEventIndex === index) { setEditingEventIndex(null); setNewEvent({ titleEn: '', titleHi: '', descEn: '', descHi: '', img: '' }); }
    }
  };

  // --- RESULTS Handlers ---
  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultData: YearResult = {
      year: newResult.year,
      class10: {
        totalStudents: Number(newResult.class10Total), passed: Number(newResult.class10Pass),
        failed: Number(newResult.class10Total) - Number(newResult.class10Pass),
        passPercentage: newResult.class10Percent, toppers: []
      },
      class12: {
        totalStudents: Number(newResult.class12Total), passed: Number(newResult.class12Pass),
        failed: Number(newResult.class12Total) - Number(newResult.class12Pass),
        passPercentage: newResult.class12Percent, toppers: []
      }
    };

    if (isSupabaseConfigured()) {
      const dbPayload = { year: resultData.year, class10: resultData.class10, class12: resultData.class12 };
      if (editingResultYear) {
        await supabase.from('punwarka_results').update(dbPayload).eq('year', editingResultYear);
      } else {
        await supabase.from('punwarka_results').insert([dbPayload]);
      }
    }

    if (editingResultYear) {
      setExamResults(examResults.map(r => r.year === editingResultYear ? resultData : r));
      setEditingResultYear(null);
    } else {
      setExamResults([...examResults, resultData].sort((a, b) => a.year.localeCompare(b.year)));
    }
    setNewResult({ year: '', class10Total: '', class10Pass: '', class10Percent: '', class12Total: '', class12Pass: '', class12Percent: '' });
  };

  const handleEditResult = (year: string) => {
    const res = examResults.find(r => r.year === year);
    if (res) {
      setNewResult({
        year: res.year,
        class10Total: res.class10.totalStudents.toString(), class10Pass: res.class10.passed.toString(), class10Percent: res.class10.passPercentage.toString(),
        class12Total: res.class12.totalStudents.toString(), class12Pass: res.class12.passed.toString(), class12Percent: res.class12.passPercentage.toString()
      });
      setEditingResultYear(year);
    }
  };

  const handleDeleteResult = async (year: string) => {
    if (window.confirm('Are you sure?')) {
      if (isSupabaseConfigured()) {
         await supabase.from('punwarka_results').delete().eq('year', year);
      }
      setExamResults(examResults.filter(r => r.year !== year));
      if (editingResultYear === year) setEditingResultYear(null);
    }
  };

  // --- STAFF Handlers ---
  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    const memberData: StaffMember = {
      id: editingStaffId || Date.now(),
      name: { en: newStaff.nameEn, hi: newStaff.nameHi },
      designation: { en: newStaff.designationEn, hi: newStaff.designationHi },
      subject: { en: newStaff.subjectEn, hi: newStaff.subjectHi },
      photo: newStaff.photo
    };

    if (isSupabaseConfigured()) {
      const dbPayload = {
        name_en: newStaff.nameEn, name_hi: newStaff.nameHi,
        designation_en: newStaff.designationEn, designation_hi: newStaff.designationHi,
        subject_en: newStaff.subjectEn, subject_hi: newStaff.subjectHi,
        photo: newStaff.photo
      };
      if (editingStaffId) {
        await supabase.from('punwarka_staff').update(dbPayload).eq('id', editingStaffId);
      } else {
        const { data } = await supabase.from('punwarka_staff').insert([dbPayload]).select();
        if (data) memberData.id = data[0].id;
      }
    }

    if (editingStaffId) {
      setStaff(staff.map(s => s.id === editingStaffId ? memberData : s));
      setEditingStaffId(null);
    } else {
      setStaff([...staff, memberData]);
    }
    setNewStaff({ nameEn: '', nameHi: '', designationEn: '', designationHi: '', subjectEn: '', subjectHi: '', photo: '' });
  };

  const handleEditStaff = (id: number) => {
    const s = staff.find(s => s.id === id);
    if (s) {
      setNewStaff({
        nameEn: s.name.en, nameHi: s.name.hi,
        designationEn: s.designation.en, designationHi: s.designation.hi,
        subjectEn: s.subject.en, subjectHi: s.subject.hi,
        photo: s.photo || ''
      });
      setEditingStaffId(id);
    }
  };

  const handleDeleteStaff = async (id: number) => {
    if (window.confirm('Delete this staff member?')) {
      if (isSupabaseConfigured()) {
        await supabase.from('punwarka_staff').delete().eq('id', id);
      }
      setStaff(staff.filter(s => s.id !== id));
      if (editingStaffId === id) setEditingStaffId(null);
    }
  };

  // --- NEWS Handlers ---
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemData: NewsItem = {
      id: editingNewsId || Date.now(),
      text: { en: newNews.textEn, hi: newNews.textHi },
      content: { en: newNews.contentEn, hi: newNews.contentHi },
      image: newNews.image,
      date: newNews.date
    };

    if (isSupabaseConfigured()) {
      const dbPayload = {
        text_en: newNews.textEn, text_hi: newNews.textHi,
        content_en: newNews.contentEn, content_hi: newNews.contentHi,
        image: newNews.image, date: newNews.date
      };
      if (editingNewsId) {
        await supabase.from('punwarka_news').update(dbPayload).eq('id', editingNewsId);
      } else {
        const { data } = await supabase.from('punwarka_news').insert([dbPayload]).select();
        if (data) itemData.id = data[0].id;
      }
    }

    if (editingNewsId) {
      setNews(news.map(n => n.id === editingNewsId ? itemData : n));
      setEditingNewsId(null);
    } else {
      setNews([...news, itemData]);
    }
    setNewNews({ textEn: '', textHi: '', contentEn: '', contentHi: '', image: '', date: '' });
  };

  const handleEditNews = (id: number) => {
    const n = news.find(n => n.id === id);
    if (n) {
      setNewNews({
        textEn: n.text.en, textHi: n.text.hi,
        contentEn: n.content?.en || '', contentHi: n.content?.hi || '',
        image: n.image || '',
        date: n.date
      });
      setEditingNewsId(id);
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (window.confirm('Delete this news item?')) {
      if (isSupabaseConfigured()) {
        await supabase.from('punwarka_news').delete().eq('id', id);
      }
      setNews(news.filter(n => n.id !== id));
      if (editingNewsId === id) setEditingNewsId(null);
    }
  };

  // --- FACILITIES Handlers ---
  const handleSaveFacility = async (e: React.FormEvent) => {
    e.preventDefault();
    const facData: Facility = {
      id: editingFacilityId || Date.now(),
      title: { en: newFacility.titleEn, hi: newFacility.titleHi },
      description: { en: newFacility.descEn, hi: newFacility.descHi },
      image: newFacility.image,
      icon: <Building2 className="w-6 h-6" /> // Default icon for dynamic items
    };

    if (isSupabaseConfigured()) {
      const dbPayload = {
        title_en: newFacility.titleEn, title_hi: newFacility.titleHi,
        description_en: newFacility.descEn, description_hi: newFacility.descHi,
        image: newFacility.image
      };
      if (editingFacilityId) {
        await supabase.from('punwarka_facilities').update(dbPayload).eq('id', editingFacilityId);
      } else {
        const { data } = await supabase.from('punwarka_facilities').insert([dbPayload]).select();
        if (data) facData.id = data[0].id;
      }
    }

    if (editingFacilityId) {
      setFacilities(facilities.map(f => f.id === editingFacilityId ? { ...f, ...facData, icon: f.icon } : f));
      setEditingFacilityId(null);
    } else {
      setFacilities([...facilities, facData]);
    }
    setNewFacility({ titleEn: '', titleHi: '', descEn: '', descHi: '', image: '' });
  };

  const handleEditFacility = (id: number) => {
    const f = facilities.find(fac => fac.id === id);
    if (f) {
      setNewFacility({
        titleEn: f.title.en, titleHi: f.title.hi,
        descEn: f.description.en, descHi: f.description.hi,
        image: f.image
      });
      setEditingFacilityId(id);
    }
  };

  const handleDeleteFacility = async (id: number) => {
    if (window.confirm('Delete this facility?')) {
      if (isSupabaseConfigured()) {
        await supabase.from('punwarka_facilities').delete().eq('id', id);
      }
      setFacilities(facilities.filter(f => f.id !== id));
      if (editingFacilityId === id) setEditingFacilityId(null);
    }
  };

  // --- SETTINGS Handlers ---
  const handleSaveSettings = async () => {
    if (isSupabaseConfigured()) {
      // We must save each key individually in punwarka_settings
      const upserts = [
        { key: 'school_name_en', value: siteConfig.schoolName.en },
        { key: 'school_name_hi', value: siteConfig.schoolName.hi },
        { key: 'school_sub_en', value: siteConfig.subTitle.en },
        { key: 'school_sub_hi', value: siteConfig.subTitle.hi },
        { key: 'address_en', value: siteConfig.address.en },
        { key: 'address_hi', value: siteConfig.address.hi },
        { key: 'phone', value: siteConfig.phone },
        { key: 'email', value: siteConfig.email },
        { key: 'hero_images', value: JSON.stringify(siteConfig.heroImages) },
        { key: 'about_image', value: siteConfig.aboutImage },
        { key: 'logo', value: siteConfig.logo || '' },
      ];
      
      const { error } = await supabase.from('punwarka_settings').upsert(upserts);
      if (error) {
        console.error("Settings save error:", error);
        alert("Error saving settings");
      } else {
        alert('Website settings updated successfully!');
      }
    } else {
      alert('Supabase not configured');
    }
  };

  // Helper for hero images array
  const addHeroImage = () => {
    setSiteConfig({...siteConfig, heroImages: [...siteConfig.heroImages, ""]});
  };
  const updateHeroImage = (idx: number, val: string) => {
    const newImages = [...siteConfig.heroImages];
    newImages[idx] = val;
    setSiteConfig({...siteConfig, heroImages: newImages});
  };
  const removeHeroImage = (idx: number) => {
    const newImages = siteConfig.heroImages.filter((_, i) => i !== idx);
    setSiteConfig({...siteConfig, heroImages: newImages});
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`pb-4 px-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
        activeTab === id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      <div className="flex items-center"><Icon className="w-4 h-4 mr-2" /> {label}</div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div><h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1></div>
          <button onClick={onLogout} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex space-x-4 border-b border-gray-200 overflow-x-auto scrollbar-hide">
          <TabButton id="events" label="Events" icon={Calendar} />
          <TabButton id="results" label="Results" icon={BarChart} />
          <TabButton id="staff" label="Staff" icon={Users} />
          <TabButton id="news" label="News" icon={Bell} />
          <TabButton id="facilities" label="Facilities" icon={Building2} />
          <TabButton id="settings" label="General Settings" icon={Settings} />
          <TabButton id="media" label="Media Library" icon={ImageIcon} />
        </div>

        {/* --- GENERAL SETTINGS TAB --- */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center"><Settings className="w-5 h-5 mr-2 text-orange-600" /> Website Configuration</h2>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">School Name (English)</label>
                   <input type="text" value={siteConfig.schoolName.en} onChange={(e) => setSiteConfig({...siteConfig, schoolName: {...siteConfig.schoolName, en: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">School Name (Hindi)</label>
                   <input type="text" value={siteConfig.schoolName.hi} onChange={(e) => setSiteConfig({...siteConfig, schoolName: {...siteConfig.schoolName, hi: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Subtitle / Dept (English)</label>
                   <input type="text" value={siteConfig.subTitle.en} onChange={(e) => setSiteConfig({...siteConfig, subTitle: {...siteConfig.subTitle, en: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Subtitle / Dept (Hindi)</label>
                   <input type="text" value={siteConfig.subTitle.hi} onChange={(e) => setSiteConfig({...siteConfig, subTitle: {...siteConfig.subTitle, hi: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Address (English)</label>
                   <input type="text" value={siteConfig.address.en} onChange={(e) => setSiteConfig({...siteConfig, address: {...siteConfig.address, en: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Address (Hindi)</label>
                   <input type="text" value={siteConfig.address.hi} onChange={(e) => setSiteConfig({...siteConfig, address: {...siteConfig.address, hi: e.target.value}})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Phone</label>
                   <input type="text" value={siteConfig.phone} onChange={(e) => setSiteConfig({...siteConfig, phone: e.target.value})} className="w-full border p-2 rounded" />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Email</label>
                   <input type="text" value={siteConfig.email} onChange={(e) => setSiteConfig({...siteConfig, email: e.target.value})} className="w-full border p-2 rounded" />
                 </div>
              </div>

              {/* Logo Upload */}
              <div className="border-t pt-6">
                 <h3 className="font-medium text-gray-900 mb-3">School Logo</h3>
                 <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <div className="flex gap-2">
                        <input type="text" value={siteConfig.logo || ''} onChange={(e) => setSiteConfig({...siteConfig, logo: e.target.value})} placeholder="Logo URL" className="flex-1 border p-2 rounded" />
                        <label className="cursor-pointer bg-gray-100 border p-2 rounded hover:bg-gray-200"><Upload className="w-5 h-5" />
                            <input type="file" className="hidden" accept="image/*" onChange={async(e) => {
                              if(e.target.files?.[0]) {
                                const url = await handleImageUpload(e.target.files[0]);
                                if(url) setSiteConfig({...siteConfig, logo: url});
                              }
                            }} />
                        </label>
                      </div>
                    </div>
                    <div className="h-16 w-16 border border-gray-200 rounded bg-gray-50 flex items-center justify-center overflow-hidden">
                      {siteConfig.logo ? (
                        <img src={siteConfig.logo} className="h-full w-full object-contain" alt="Logo" />
                      ) : (
                        <span className="text-xs text-gray-400">No Logo</span>
                      )}
                    </div>
                 </div>
              </div>

              {/* About Image */}
              <div className="border-t pt-6">
                 <h3 className="font-medium text-gray-900 mb-3">About Section Image</h3>
                 <div className="flex gap-2 items-center">
                    <input type="text" value={siteConfig.aboutImage} onChange={(e) => setSiteConfig({...siteConfig, aboutImage: e.target.value})} className="flex-1 border p-2 rounded" />
                    <label className="cursor-pointer bg-gray-100 border p-2 rounded hover:bg-gray-200"><Upload className="w-5 h-5" />
                        <input type="file" className="hidden" accept="image/*" onChange={async(e) => {
                          if(e.target.files?.[0]) {
                            const url = await handleImageUpload(e.target.files[0]);
                            if(url) setSiteConfig({...siteConfig, aboutImage: url});
                          }
                        }} />
                    </label>
                 </div>
              </div>

              {/* Hero Slideshow */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900">Hero Slideshow Images</h3>
                  <button onClick={addHeroImage} className="text-xs flex items-center bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"><Plus className="w-3 h-3 mr-1" /> Add Slide</button>
                </div>
                <div className="space-y-3">
                  {siteConfig.heroImages.map((img, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <span className="text-xs text-gray-400 w-4">{idx+1}</span>
                      <input type="text" value={img} onChange={(e) => updateHeroImage(idx, e.target.value)} className="flex-1 border p-2 rounded text-sm" />
                      <label className="cursor-pointer bg-gray-100 border p-2 rounded hover:bg-gray-200"><Upload className="w-4 h-4" />
                          <input type="file" className="hidden" accept="image/*" onChange={async(e) => {
                            if(e.target.files?.[0]) {
                              const url = await handleImageUpload(e.target.files[0]);
                              if(url) updateHeroImage(idx, url);
                            }
                          }} />
                      </label>
                      <button onClick={() => removeHeroImage(idx)} className="text-red-500 hover:bg-red-50 p-2 rounded"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t flex justify-end">
                <button onClick={handleSaveSettings} className="flex items-center px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow-sm">
                  <Save className="w-4 h-4 mr-2" /> Save Configuration
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- MEDIA TAB --- */}
        {activeTab === 'media' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
               <ImageIcon className="w-5 h-5 mr-2 text-orange-600" /> Media Library
            </h2>

            {/* Upload Area */}
            <div className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 mb-4">Upload new image to Global Gallery</p>
              <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 cursor-pointer">
                {uploading ? <Loader className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {uploading ? 'Uploading...' : 'Select Image'}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  disabled={uploading}
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const url = await handleImageUpload(e.target.files[0]);
                      if (url) {
                        setGlobalUploadUrl(url);
                        fetchGalleryImages(); // Refresh list
                      }
                    }
                  }} 
                />
              </label>
              {globalUploadUrl && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between max-w-lg mx-auto">
                   <span className="text-xs text-green-700 truncate mr-2">{globalUploadUrl}</span>
                   <button onClick={() => copyToClipboard(globalUploadUrl)} className="text-green-600 hover:text-green-800">
                     {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                   </button>
                </div>
              )}
            </div>

            {/* Gallery Grid */}
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-semibold text-gray-700">Uploaded Images</h3>
               <button onClick={fetchGalleryImages} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><RefreshCw className={`w-4 h-4 ${loadingGallery ? 'animate-spin' : ''}`} /></button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-2 p-2">
                     <button onClick={() => copyToClipboard(img.url)} className="bg-white text-gray-800 text-xs px-2 py-1 rounded shadow hover:bg-gray-100 w-full truncate">
                       {copied ? 'Copied!' : 'Copy URL'}
                     </button>
                     <button onClick={() => handleRenameImage(img.name)} className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600"><Edit2 className="w-3 h-3" /></button>
                     <button onClick={() => handleDeleteImage(img.name)} className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"><Trash2 className="w-3 h-3" /></button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[10px] p-1 truncate">
                    {img.name}
                  </div>
                </div>
              ))}
              {!loadingGallery && galleryImages.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-400">No images found in gallery.</div>
              )}
            </div>
          </div>
        )}

        {/* --- EVENTS TAB --- */}
        {activeTab === 'events' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">{editingEventIndex !== null ? 'Edit Event' : 'Add New Event'}</h2>
            <form onSubmit={handleSaveEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <input type="text" placeholder="Title (English)" value={newEvent.titleEn} onChange={e => setNewEvent({...newEvent, titleEn: e.target.value})} className="border p-2 rounded" required />
              <input type="text" placeholder="Title (Hindi)" value={newEvent.titleHi} onChange={e => setNewEvent({...newEvent, titleHi: e.target.value})} className="border p-2 rounded" required />
              <textarea placeholder="Description (English)" value={newEvent.descEn} onChange={e => setNewEvent({...newEvent, descEn: e.target.value})} className="border p-2 rounded" required />
              <textarea placeholder="Description (Hindi)" value={newEvent.descHi} onChange={e => setNewEvent({...newEvent, descHi: e.target.value})} className="border p-2 rounded" required />
              <div className="md:col-span-2 flex gap-2">
                 <input type="text" placeholder="Image URL" value={newEvent.img} onChange={e => setNewEvent({...newEvent, img: e.target.value})} className="border p-2 rounded flex-1" />
                 <label className="cursor-pointer bg-gray-100 border p-2 rounded hover:bg-gray-200 flex items-center justify-center w-12"><Upload className="w-4 h-4" />
                    <input type="file" className="hidden" accept="image/*" onChange={async(e) => {
                      if(e.target.files?.[0]) {
                        const url = await handleImageUpload(e.target.files[0]);
                        if(url) setNewEvent({...newEvent, img: url});
                      }
                    }} />
                 </label>
              </div>
              <button type="submit" className="md:col-span-2 bg-orange-600 text-white py-2 rounded hover:bg-orange-700 flex justify-center items-center">
                 {editingEventIndex !== null ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                 {editingEventIndex !== null ? 'Update Event' : 'Add Event'}
              </button>
              {editingEventIndex !== null && (
                <button type="button" onClick={() => { setEditingEventIndex(null); setNewEvent({ titleEn: '', titleHi: '', descEn: '', descHi: '', img: '' }); }} className="md:col-span-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">Cancel Edit</button>
              )}
            </form>

            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="flex justify-between items-center border p-4 rounded hover:bg-gray-50">
                  <div className="flex gap-4 items-center">
                     <img src={event.img} alt="" className="w-16 h-12 object-cover rounded" />
                     <div>
                       <h3 className="font-bold">{event.title.en}</h3>
                       <p className="text-sm text-gray-500 truncate max-w-md">{event.desc.en}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditEvent(index)} className="text-blue-500 hover:text-blue-700 p-2"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteEvent(index)} className="text-red-500 hover:text-red-700 p-2"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- FACILITIES TAB --- */}
        {activeTab === 'facilities' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">{editingFacilityId ? 'Edit Facility' : 'Add New Facility'}</h2>
            <form onSubmit={handleSaveFacility} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <input type="text" placeholder="Title (English)" value={newFacility.titleEn} onChange={e => setNewFacility({...newFacility, titleEn: e.target.value})} className="border p-2 rounded" required />
              <input type="text" placeholder="Title (Hindi)" value={newFacility.titleHi} onChange={e => setNewFacility({...newFacility, titleHi: e.target.value})} className="border p-2 rounded" required />
              <textarea placeholder="Description (English)" value={newFacility.descEn} onChange={e => setNewFacility({...newFacility, descEn: e.target.value})} className="border p-2 rounded" required />
              <textarea placeholder="Description (Hindi)" value={newFacility.descHi} onChange={e => setNewFacility({...newFacility, descHi: e.target.value})} className="border p-2 rounded" required />
              <div className="md:col-span-2 flex gap-2">
                 <input type="text" placeholder="Image URL" value={newFacility.image} onChange={e => setNewFacility({...newFacility, image: e.target.value})} className="border p-2 rounded flex-1" />
                 <label className="cursor-pointer bg-gray-100 border p-2 rounded hover:bg-gray-200 flex items-center justify-center w-12"><Upload className="w-4 h-4" />
                    <input type="file" className="hidden" accept="image/*" onChange={async(e) => {
                      if(e.target.files?.[0]) {
                        const url = await handleImageUpload(e.target.files[0]);
                        if(url) setNewFacility({...newFacility, image: url});
                      }
                    }} />
                 </label>
              </div>
              <button type="submit" className="md:col-span-2 bg-orange-600 text-white py-2 rounded hover:bg-orange-700 flex justify-center items-center">
                 {editingFacilityId ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                 {editingFacilityId ? 'Update Facility' : 'Add Facility'}
              </button>
              {editingFacilityId && (
                <button type="button" onClick={() => { setEditingFacilityId(null); setNewFacility({ titleEn: '', titleHi: '', descEn: '', descHi: '', image: '' }); }} className="md:col-span-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">Cancel Edit</button>
              )}
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facilities.map((fac) => (
                <div key={fac.id} className="border p-4 rounded hover:bg-gray-50 relative group">
                  <img src={fac.image} alt="" className="w-full h-32 object-cover rounded mb-2" />
                  <h3 className="font-bold">{fac.title.en}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{fac.description.en}</p>
                  <div className="absolute top-2 right-2 flex gap-1 bg-white p-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => fac.id && handleEditFacility(fac.id)} className="text-blue-500 p-1"><Edit2 className="w-3 h-3" /></button>
                    <button onClick={() => fac.id && handleDeleteFacility(fac.id)} className="text-red-500 p-1"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- RESULTS TAB --- */}
        {activeTab === 'results' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">{editingResultYear ? 'Edit Result Year' : 'Add Result Year'}</h2>
            <form onSubmit={handleSaveResult} className="space-y-6 mb-8">
               <div className="flex gap-4 items-center bg-gray-50 p-3 rounded">
                 <label className="font-semibold w-32">Academic Year:</label>
                 <input type="text" placeholder="e.g. 2023-24" value={newResult.year} onChange={e => setNewResult({...newResult, year: e.target.value})} className="border p-2 rounded flex-1" required disabled={!!editingResultYear} />
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="border p-4 rounded-lg">
                   <h3 className="font-bold text-orange-600 mb-3">Class 10</h3>
                   <div className="space-y-3">
                     <input type="number" placeholder="Total Students" value={newResult.class10Total} onChange={e => setNewResult({...newResult, class10Total: e.target.value})} className="w-full border p-2 rounded" required />
                     <input type="number" placeholder="Passed Students" value={newResult.class10Pass} onChange={e => setNewResult({...newResult, class10Pass: e.target.value})} className="w-full border p-2 rounded" required />
                     <input type="text" placeholder="Pass Percentage (e.g. 98.5)" value={newResult.class10Percent} onChange={e => setNewResult({...newResult, class10Percent: e.target.value})} className="w-full border p-2 rounded" required />
                   </div>
                 </div>
                 <div className="border p-4 rounded-lg">
                   <h3 className="font-bold text-green-600 mb-3">Class 12</h3>
                   <div className="space-y-3">
                     <input type="number" placeholder="Total Students" value={newResult.class12Total} onChange={e => setNewResult({...newResult, class12Total: e.target.value})} className="w-full border p-2 rounded" required />
                     <input type="number" placeholder="Passed Students" value={newResult.class12Pass} onChange={e => setNewResult({...newResult, class12Pass: e.target.value})} className="w-full border p-2 rounded" required />
                     <input type="text" placeholder="Pass Percentage (e.g. 100)" value={newResult.class12Percent} onChange={e => setNewResult({...newResult, class12Percent: e.target.value})} className="w-full border p-2 rounded" required />
                   </div>
                 </div>
               </div>

               <div className="flex gap-2">
                 <button type="submit" className="flex-1 bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
                    {editingResultYear ? 'Update Results' : 'Save Results'}
                 </button>
                 {editingResultYear && (
                    <button type="button" onClick={() => { setEditingResultYear(null); setNewResult({ year: '', class10Total: '', class10Pass: '', class10Percent: '', class12Total: '', class12Pass: '', class12Percent: '' }); }} className="bg-gray-500 text-white px-4 rounded hover:bg-gray-600">Cancel</button>
                 )}
               </div>
            </form>

            <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200 text-sm">
                 <thead className="bg-gray-50">
                   <tr>
                     <th className="px-4 py-2 text-left">Year</th>
                     <th className="px-4 py-2 text-left">Class 10 Pass %</th>
                     <th className="px-4 py-2 text-left">Class 12 Pass %</th>
                     <th className="px-4 py-2 text-left">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-200">
                   {examResults.map((res) => (
                     <tr key={res.year}>
                       <td className="px-4 py-2 font-medium">{res.year}</td>
                       <td className="px-4 py-2">{res.class10.passPercentage}%</td>
                       <td className="px-4 py-2">{res.class12.passPercentage}%</td>
                       <td className="px-4 py-2 flex gap-2">
                         <button onClick={() => handleEditResult(res.year)} className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4" /></button>
                         <button onClick={() => handleDeleteResult(res.year)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>
        )}

        {/* --- STAFF TAB --- */}
        {activeTab === 'staff' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">{editingStaffId ? 'Edit Staff Member' : 'Add New Staff'}</h2>
            <form onSubmit={handleSaveStaff} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <input type="text" placeholder="Name (English)" value={newStaff.nameEn} onChange={e => setNewStaff({...newStaff, nameEn: e.target.value})} className="border p-2 rounded" required />
              <input type="text" placeholder="Name (Hindi)" value={newStaff.nameHi} onChange={e => setNewStaff({...newStaff, nameHi: e.target.value})} className="border p-2 rounded" required />
              <input type="text" placeholder="Designation (English)" value={newStaff.designationEn} onChange={e => setNewStaff({...newStaff, designationEn: e.target.value})} className="border p-2 rounded" required />
              <input type="text" placeholder="Designation (Hindi)" value={newStaff.designationHi} onChange={e => setNewStaff({...newStaff, designationHi: e.target.value})} className="border p-2 rounded" required />
              <input type="text" placeholder="Subject (English) - Optional" value={newStaff.subjectEn} onChange={e => setNewStaff({...newStaff, subjectEn: e.target.value})} className="border p-2 rounded" />
              <input type="text" placeholder="Subject (Hindi) - Optional" value={newStaff.subjectHi} onChange={e => setNewStaff({...newStaff, subjectHi: e.target.value})} className="border p-2 rounded" />
              <div className="md:col-span-2 flex gap-2">
                 <input type="text" placeholder="Photo URL" value={newStaff.photo} onChange={e => setNewStaff({...newStaff, photo: e.target.value})} className="border p-2 rounded flex-1" />
                 <label className="cursor-pointer bg-gray-100 border p-2 rounded hover:bg-gray-200 flex items-center justify-center w-12"><Upload className="w-4 h-4" />
                    <input type="file" className="hidden" accept="image/*" onChange={async(e) => {
                      if(e.target.files?.[0]) {
                        const url = await handleImageUpload(e.target.files[0]);
                        if(url) setNewStaff({...newStaff, photo: url});
                      }
                    }} />
                 </label>
              </div>
              <button type="submit" className="md:col-span-2 bg-orange-600 text-white py-2 rounded hover:bg-orange-700 flex justify-center items-center">
                 {editingStaffId ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                 {editingStaffId ? 'Update Staff' : 'Add Staff'}
              </button>
              {editingStaffId && (
                <button type="button" onClick={() => { setEditingStaffId(null); setNewStaff({ nameEn: '', nameHi: '', designationEn: '', designationHi: '', subjectEn: '', subjectHi: '', photo: '' }); }} className="md:col-span-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">Cancel Edit</button>
              )}
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staff.map((s) => (
                <div key={s.id} className="flex items-center gap-3 border p-3 rounded hover:bg-gray-50">
                   <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      {s.photo ? <img src={s.photo} className="w-full h-full object-cover" /> : <Users className="w-full h-full p-2 text-gray-400" />}
                   </div>
                   <div className="flex-1 min-w-0">
                     <h3 className="font-bold text-sm truncate">{s.name.en}</h3>
                     <p className="text-xs text-gray-500 truncate">{s.designation.en}</p>
                   </div>
                   <div className="flex gap-1">
                     <button onClick={() => s.id && handleEditStaff(s.id)} className="text-blue-500 p-1"><Edit2 className="w-3 h-3" /></button>
                     <button onClick={() => s.id && handleDeleteStaff(s.id)} className="text-red-500 p-1"><Trash2 className="w-3 h-3" /></button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- NEWS TAB --- */}
        {activeTab === 'news' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">{editingNewsId ? 'Edit News' : 'Add New News'}</h2>
            <form onSubmit={handleSaveNews} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <input type="text" placeholder="Headline (English)" value={newNews.textEn} onChange={e => setNewNews({...newNews, textEn: e.target.value})} className="border p-2 rounded" required />
              <input type="text" placeholder="Headline (Hindi)" value={newNews.textHi} onChange={e => setNewNews({...newNews, textHi: e.target.value})} className="border p-2 rounded" required />
              <textarea placeholder="Detailed Content (English)" value={newNews.contentEn} onChange={e => setNewNews({...newNews, contentEn: e.target.value})} className="border p-2 rounded" rows={3} />
              <textarea placeholder="Detailed Content (Hindi)" value={newNews.contentHi} onChange={e => setNewNews({...newNews, contentHi: e.target.value})} className="border p-2 rounded" rows={3} />
              <input type="date" value={newNews.date} onChange={e => setNewNews({...newNews, date: e.target.value})} className="border p-2 rounded" required />
              <div className="flex gap-2">
                 <input type="text" placeholder="Image URL" value={newNews.image} onChange={e => setNewNews({...newNews, image: e.target.value})} className="border p-2 rounded flex-1" />
                 <label className="cursor-pointer bg-gray-100 border p-2 rounded hover:bg-gray-200 flex items-center justify-center w-12"><Upload className="w-4 h-4" />
                    <input type="file" className="hidden" accept="image/*" onChange={async(e) => {
                      if(e.target.files?.[0]) {
                        const url = await handleImageUpload(e.target.files[0]);
                        if(url) setNewNews({...newNews, image: url});
                      }
                    }} />
                 </label>
              </div>
              <button type="submit" className="md:col-span-2 bg-orange-600 text-white py-2 rounded hover:bg-orange-700 flex justify-center items-center">
                 {editingNewsId ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                 {editingNewsId ? 'Update News' : 'Add News'}
              </button>
              {editingNewsId && (
                <button type="button" onClick={() => { setEditingNewsId(null); setNewNews({ textEn: '', textHi: '', contentEn: '', contentHi: '', image: '', date: '' }); }} className="md:col-span-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">Cancel Edit</button>
              )}
            </form>

            <div className="space-y-3">
              {news.map((item) => (
                <div key={item.id} className="flex justify-between items-start border p-3 rounded hover:bg-gray-50">
                   <div>
                     <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{item.date}</span>
                     <h3 className="font-bold mt-1">{item.text.en}</h3>
                     {item.content?.en && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.content.en}</p>}
                   </div>
                   <div className="flex gap-1 ml-4">
                     <button onClick={() => item.id && handleEditNews(item.id)} className="text-blue-500 p-1"><Edit2 className="w-4 h-4" /></button>
                     <button onClick={() => item.id && handleDeleteNews(item.id)} className="text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;