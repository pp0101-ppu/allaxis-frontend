<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api/axios';

const items = ref([]);
const services = ref([]);
const loading = ref(true);
const showForm = ref(false);
const editingId = ref(null);
const uploadingId = ref(null);

const form = ref({
    service_id: null,
    title: '',
    client_name: '',
    tour_embed_url: '',
    description: '',
    is_published: true,
});

const fetchData = async () => {
    loading.value = true;
    const [itemsRes, servicesRes] = await Promise.all([
        api.get('/portfolio-items'),
        api.get('/services'),
    ]);
    items.value = itemsRes.data.data;
    services.value = servicesRes.data.data;
    loading.value = false;
};

onMounted(fetchData);

const openCreateForm = () => {
    editingId.value = null;
    form.value = {
        service_id: null, title: '', client_name: '',
        tour_embed_url: '', description: '', is_published: true,
    };
    showForm.value = true;
};

const openEditForm = (item) => {
    editingId.value = item.id;
    form.value = {
        service_id: item.service_id,
        title: item.title,
        client_name: item.client_name,
        tour_embed_url: item.tour_embed_url,
        description: item.description,
        is_published: item.is_published,
    };
    showForm.value = true;
};

const saveItem = async () => {
    if (editingId.value) {
        await api.put(`/portfolio-items/${editingId.value}`, form.value);
    } else {
        await api.post('/portfolio-items', form.value);
    }
    showForm.value = false;
    await fetchData();
};

const deleteItem = async (id) => {
    if (!confirm('Delete this portfolio item?')) return;
    await api.delete(`/portfolio-items/${id}`);
    await fetchData();
};

const handleImageUpload = async (event, itemId) => {
    const file = event.target.files[0];
    if (!file) return;

    uploadingId.value = itemId;
    const formData = new FormData();
    formData.append('image', file);

    try {
        await api.post(`/portfolio-items/${itemId}/cover-image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        await fetchData();
    } catch (err) {
        alert('Upload failed.');
        console.error(err);
    } finally {
        uploadingId.value = null;
        event.target.value = '';
    }
};
</script>

<template>
    <div class="admin-page">
        <div class="page-header">
            <h1>Portfolio</h1>
            <button class="btn-primary" @click="openCreateForm">+ Add Item</button>
        </div>

        <div v-if="loading">Loading...</div>

        <table v-else class="data-table">
            <thead>
                <tr><th>Cover</th><th>Title</th><th>Client</th><th>Published</th><th>Upload</th><th></th></tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td>
                        <img v-if="item.cover_image" :src="item.cover_image" class="thumb" />
                        <span v-else class="no-image">No image</span>
                    </td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.client_name || '—' }}</td>
                    <td>{{ item.is_published ? 'Yes' : 'No' }}</td>
                    <td>
                        <input
                            type="file"
                            accept="image/*"
                            :disabled="uploadingId === item.id"
                            @change="(e) => handleImageUpload(e, item.id)"
                        />
                    </td>
                    <td class="actions">
                        <button @click="openEditForm(item)">Edit</button>
                        <button @click="deleteItem(item.id)" class="delete-btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
            <form class="modal-form" @submit.prevent="saveItem">
                <h2>{{ editingId ? 'Edit' : 'Add' }} Portfolio Item</h2>
                <input v-model="form.title" placeholder="Title" required />
                <input v-model="form.client_name" placeholder="Client Name" />
                <select v-model="form.service_id">
                    <option :value="null">No linked service</option>
                    <option v-for="s in services" :key="s.id" :value="s.id">{{ s.title }}</option>
                </select>
                <input v-model="form.tour_embed_url" placeholder="360 Tour Embed URL (optional)" />
                <textarea v-model="form.description" placeholder="Description" rows="3"></textarea>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="form.is_published" /> Published
                </label>
                <p v-if="!editingId" class="hint">Save first, then upload a cover photo from the table.</p>
                <div class="modal-actions">
                    <button type="button" @click="showForm = false">Cancel</button>
                    <button type="submit" class="btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.admin-page { color: rgb(7, 1, 1); }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.btn-primary { background: var(--primary); color: #050505; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.thumb { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; }
.no-image { font-size: 0.8rem; color: rgba(255,255,255,0.4); }
.data-table input[type="file"] { max-width: 160px; font-size: 0.8rem; }
.actions button { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: white; padding: 6px 12px; border-radius: 6px; margin-right: 8px; cursor: pointer; }
.delete-btn { border-color: rgba(248,113,113,0.4) !important; color: hsl(0, 92%, 45%) !important; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; }
.modal-form { background: #0d0d0d; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px; width: 420px; max-height: 85vh; overflow-y: auto; display: flex; flex-direction: column; gap: 14px; }
.modal-form input, .modal-form select, .modal-form textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; color: white; }
.checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }
.hint { font-size: 0.8rem; color: rgba(255,255,255,0.5); }
.modal-actions { display: flex; justify-content: flex-end; gap: 12px; }
</style>