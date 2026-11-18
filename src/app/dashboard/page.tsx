'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Card, Input } from '@/components';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const [galleryReadOnly, setGalleryReadOnly] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  useEffect(() => { checkAuth(); }, []);
  useEffect(() => { if (isAuthenticated) fetchGalleryItems(); }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const result = await response.json();
      setIsAuthenticated(result.authenticated);
    } catch (error) {
      console.error('Auth check hatası:', error);
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (result.success) {
        setIsAuthenticated(true);
        setUsername('');
        setPassword('');
      } else {
        setLoginError(result.error || 'Giriş başarısız');
      }
    } catch {
      setLoginError('Giriş yapılırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setGalleryItems([]);
    } catch (error) {
      console.error('Logout hatası:', error);
    }
  };

  const fetchGalleryItems = async () => {
    setIsLoadingGallery(true);
    try {
      const response = await fetch('/api/gallery');
      const result = await response.json();
      if (result.success) {
        setGalleryItems(result.data || []);
        setGalleryReadOnly(result.readOnly === true);
      }
    } catch (error) {
      console.error('Galeri yükleme hatası:', error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const uploadFile = useCallback(async (file: File) => {
    const isImage = file.type.startsWith('image/');

    if (!isImage) {
      setUploadStatus({ type: 'error', message: `Desteklenmeyen dosya tipi: ${file.type}` });
      return;
    }

    const sizeMB = (file.size / 1024 / 1024).toFixed(1);
    setUploadingImage(true);
    setUploadStatus({ type: 'info', message: `Yükleniyor: ${file.name} (${sizeMB}MB)...` });

    try {
      const fd = new FormData();
      fd.append('file', file);

      const settingsResponse = await fetch('/api/gallery/upload', { cache: 'no-store' });
      const settings = await settingsResponse.json();
      if (!settingsResponse.ok) throw new Error(settings.error || 'Yükleme ayarları alınamadı');

      const cloudUpload = settings.upload;
      if (cloudUpload) {
        const maxMegabytes = 10;
        if (file.size > maxMegabytes * 1024 * 1024) {
          throw new Error(`Dosya boyutu ${maxMegabytes} MB sınırını aşıyor`);
        }
        for (const [key, value] of Object.entries(cloudUpload.fields)) {
          fd.set(key, String(value));
        }
        const cloudResponse = await fetch(cloudUpload.url, { method: 'POST', body: fd });
        const cloudResult = await cloudResponse.json();
        if (!cloudResponse.ok || !cloudResult.secure_url) {
          throw new Error(cloudResult.error?.message || 'Cloudinary yüklemesi başarısız');
        }
        if (cloudResult.resource_type !== 'image') throw new Error('Yalnızca fotoğraf yüklenebilir');
        setFormData(prev => ({ ...prev, image: cloudResult.secure_url }));
        setUploadStatus({ type: 'success', message: `✅ Dosya yüklendi (${sizeMB} MB)` });
        return;
      }

      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: fd,
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok && result.success && result.data) {
        const url = result.data.url;
        setFormData(prev => ({
          ...prev,
          image: url,
        }));
        setUploadStatus({
          type: 'success',
          message: `✅ Fotoğraf başarıyla yüklendi! (${sizeMB}MB)`,
        });
      } else {
        setUploadStatus({
          type: 'error',
          message: `❌ ${result.error || 'Dosya yüklenemedi'}`,
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Bilinmeyen hata';
      setUploadStatus({ type: 'error', message: `❌ Yükleme hatası: ${msg}` });
      console.error('Upload error:', err);
    } finally {
      setUploadingImage(false);
    }
  }, []);

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    dragCounterRef.current++;
    if (e.dataTransfer.items?.length) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    dragCounterRef.current = 0;
    if (e.dataTransfer.files?.length) await uploadFile(e.dataTransfer.files[0]);
  }, [uploadFile]);

  const handleUrlChange = (url: string) => {
    setUploadStatus(null);
    setFormData({ ...formData, image: url });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Lütfen bir fotoğraf ekleyin');
      return;
    }
    try {
      const url = editingItem ? `/api/gallery/${editingItem.id}` : '/api/gallery';
      const method = editingItem ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        await fetchGalleryItems();
        resetForm();
        alert(editingItem ? 'Galeri öğesi güncellendi' : 'Galeri öğesi eklendi');
      } else {
        alert(result.error || 'İşlem başarısız');
      }
    } catch {
      alert('İşlem sırasında bir hata oluştu');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', image: '', description: '' });
    setEditingItem(null);
    setShowAddForm(false);
    setUploadStatus(null);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title, image: item.image,
      description: item.description,
    });
    setShowAddForm(true);
    setUploadStatus(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu öğeyi silmek istediğinize emin misiniz?')) return;
    try {
      const response = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) { await fetchGalleryItems(); alert('Galeri öğesi silindi'); }
      else alert(result.error || 'Silme işlemi başarısız');
    } catch {
      alert('Silme işlemi sırasında bir hata oluştu');
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <Card variant="elevated" className="max-w-md w-full p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Admin Girişi</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Adı</label>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Kullanıcı adınızı girin" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Şifrenizi girin" />
            </div>
            {loginError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{loginError}</div>}
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  if (galleryReadOnly) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Fotoğraf galerisi</h1>
        <p className="mb-6">Yayındaki fotoğraflar proje dosyalarından dağıtım ile güncellenir.</p>
        <Button variant="outline" onClick={handleLogout}>Çıkış Yap</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Galeri Yönetimi</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>Çıkış Yap</Button>
        </div>

        {showAddForm && (
          <Card variant="elevated" className="mb-8 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingItem ? 'Galeri Öğesini Düzenle' : 'Yeni Galeri Öğesi Ekle'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Başlık</label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Örn: Düğün Organizasyonu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fotoğraf</label>

                <div className="flex gap-4 mb-3">
                  <Input
                    type="text"
                    value={formData.image}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="URL yapıştırın veya dosya yükleyin"
                    className="flex-1"
                  />
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? 'Yükleniyor...' : 'Dosya Seç'}
                    </Button>
                  </div>
                </div>

                {/* Drag & Drop Zone */}
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => !uploadingImage && fileInputRef.current?.click()}
                  className={`
                    relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
                    ${isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50'}
                    ${uploadingImage ? 'pointer-events-none opacity-60' : ''}
                  `}
                >
                  {uploadingImage ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                      <p className="text-blue-600 font-medium">Dosya yükleniyor... Lütfen bekleyin.</p>
                    </div>
                  ) : isDragging ? (
                    <div className="flex flex-col items-center">
                      <div className="text-5xl mb-3">📥</div>
                      <p className="text-blue-600 font-semibold text-lg">Dosyayı buraya bırakın!</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="text-4xl mb-3">🖼️ 🎬</div>
                      <p className="text-gray-600 font-medium">Fotoğraf sürükleyip bırakın</p>
                      <p className="text-gray-400 text-sm mt-1">veya tıklayarak dosya seçin</p>
                      <p className="text-gray-400 text-xs mt-2">Görsel: max 10MB • Video: max 200MB</p>
                    </div>
                  )}
                </div>

                {/* Upload Status */}
                {uploadStatus && (
                  <div className={`mt-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    uploadStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                    uploadStatus.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                    'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {uploadStatus.message}
                  </div>
                )}

                {/* Preview */}
                {formData.image && (
                  <div className="mt-4 relative inline-block">
                      <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow-md" />
                    <button
                      type="button"
                      onClick={() => { setFormData({ ...formData, image: '' }); setUploadStatus(null); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 shadow"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Kısa açıklama (opsiyonel)"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" variant="primary">{editingItem ? 'Güncelle' : 'Ekle'}</Button>
                <Button type="button" variant="outline" onClick={resetForm}>İptal</Button>
              </div>
            </form>
          </Card>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Galeri Öğeleri ({galleryItems.length})</h2>
          {!showAddForm && (
            <Button variant="primary" onClick={() => setShowAddForm(true)}>+ Yeni Öğe Ekle</Button>
          )}
        </div>

        {isLoadingGallery ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        ) : galleryItems.length === 0 ? (
          <Card variant="elevated" className="p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📷</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz galeri öğesi yok</h3>
            <p className="text-gray-600 mb-6">İlk galeri öğenizi eklemek için butona tıklayın.</p>
            <Button variant="primary" onClick={() => setShowAddForm(true)}>İlk Öğeyi Ekle</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => {
              return (
                <Card key={item.id} variant="elevated" className="overflow-hidden">
                  <div className="relative">
                      <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    {item.description && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>Düzenle</Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 border-red-300">Sil</Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
