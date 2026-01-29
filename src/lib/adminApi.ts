interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  item?: T;
}

export async function fetchAdminData<T>(type: string): Promise<T[]> {
  try {
 const response = await fetch(`/admin/api/list.php?type=${type}&v=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
        if (!response.ok) {
      console.warn(`No data file found for ${type}`);
      return [];
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch ${type}:`, error);
    return [];
  }
}

export async function fetchFiles(): Promise<{ success: boolean; files: any[]; count: number }> {
  try {
 const response = await fetch(`/admin/api/list-files.php?v=${Date.now()}`, {
      cache: 'no-store'
    });
        if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error('Failed to fetch files from API:', error);
  }
  return { success: false, files: [], count: 0 };
}

export async function saveAdminData<T>(
  action: 'add' | 'update',
  type: string,
  data: any,
  id?: string
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch('/admin/api/save.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        type,
        ...(id ? { id, updates: data } : { data })
      })
    });
    return response.json();
  } catch (error) {
    console.error('Failed to save data:', error);
    return { success: false, error: 'Failed to save data' };
  }
}

export async function deleteAdminData(
  type: string,
  id: string,
  path?: string
): Promise<ApiResponse<void>> {
  try {
    const response = await fetch('/admin/api/delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id, ...(path && { path }) })
    });
    return response.json();
  } catch (error) {
    console.error('Failed to delete data:', error);
    return { success: false, error: 'Failed to delete data' };
  }
}

export async function deleteFile(filename: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch('/admin/api/delete-image.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename })
    });
    return response.json();
  } catch (error) {
    console.error('Failed to delete file:', error);
    return { success: false, error: 'Failed to delete file' };
  }
}

export async function replaceFile(target: string, file: File): Promise<ApiResponse<void>> {
  try {
    const formData = new FormData();
    formData.append('target', target);
    formData.append('replacement', file);

    const response = await fetch('/admin/api/replace.php', {
      method: 'POST',
      body: formData
    });
    return response.json();
  } catch (error) {
    console.error('Failed to replace file:', error);
    return { success: false, error: 'Failed to replace file' };
  }
}

export async function uploadFile(
  file: File,
  type?: string,
  category?: string,
  description?: string
): Promise<{ success: boolean; url?: string; error?: string; item?: any }> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (type) formData.append('type', type);
    if (category) formData.append('category', category);
    if (description) formData.append('description', description);

    const response = await fetch('/admin/api/upload.php', {
      method: 'POST',
      body: formData
    });
    return response.json();
  } catch (error) {
    console.error('Failed to upload file:', error);
    return { success: false, error: 'Failed to upload file' };
  }
}
