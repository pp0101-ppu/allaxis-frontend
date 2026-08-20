<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api/axios';

const clients = ref([]);
const loading = ref(true);
const showForm = ref(false);
const editingId = ref(null);
const saving = ref(false);

const form = ref({ name: '', website_url: '', sort_order: 0 });
const logoFile = ref(null);

const fetchClients = async () => {
    loading.value = true;
    const response = await api.get('/clients');
    clients.value = response.data.data;
    loading.value = false;
};

onMounted(fetchClients);

const openCreateForm = () => {
    editingId.value = null;
    form.value = { name: '', website_url: '', sort_order: 0 };
    logoFile.value = null;
    showForm.value = true;
};

const openEditForm = (client) => {
    editingId.value = client.id;
    form.value = { name: client.name, website_url: client.website_url, sort_order: client.sort_order };
    logoFile.value = null;
    showForm.value = true;
};

const handleFileChange = (e) => {
    logoFile.value = e.target.files[0] || null;
};

const saveClient = async () => {
    saving.value = true;
    const data = new FormData();
    data.append('name', form.value.name);
    data.append('website_url', form.value.website_url || '');
    data.append('sort_order', form.value.sort_order || 0);
    if (logoFile.value) data.append('logo', logoFile.value);

    try {
        if (editingId.value) {
            data.append('_method', 'PUT');
            await api.post(`/clients/${editingId.value}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } else {
            await api.post('/clients', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        }
        showForm.value = false;
        await fetchClients();
    } catch (err) {
        alert('Save failed - check the logo was selected for a new client.');
        console.error(err);
    } finally {
        saving.value = false;
    }
};

const deleteClient = async (id) => {
    if (!confirm('Delete this client?')) return;
    await api.delete(`/clients/${id}`);
    await fetchClients();
};
</script>

<template>
    <div class="admin-page">
        <div class="page-header">
            <h1>Clients</h1>
            <button class="btn-primary" @click="openCreateForm">+ Add Client</button>
        </div>

        <div v-if="loading">Loading...</div>

        <table v-else class="data-table">
            <thead>
                <tr><th>Logo</th><th>Name</th><th>Website</th><th></th></tr>
            </thead>
            <tbody>
                <tr v-for="c in clients" :key="c.id">
                    <td><img :src="c.logo_path" class="thumb" /></td>
                    <td>{{ c.name }}</td>
                    <td>{{ c.website_url || '—' }}</td>
                    <td class="actions">
                        <button @click="openEditForm(c)">Edit</button>
                        <button @click="deleteClient(c.id)" class="delete-btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
            <form class="modal-form" @submit.prevent="saveClient">
                <h2>{{ editingId ? 'Edit' : 'Add' }} Client</h2>
                <input v-model="form.name" placeholder="Client Name" required />
                <input v-model="form.website_url" placeholder="Website URL (optional)" />
                <input v-model="form.sort_order" type="number" placeholder="Sort Order" />
                <label class="field-label">{{ editingId ? 'Replace logo (optional)' : 'Logo' }}</label>
                <input type="file" accept="image/*" @change="handleFileChange" :required="!editingId" />
                <div class="modal-actions">
                    <button type="button" @click="showForm = false">Cancel</button>
                    <button type="submit" class="btn-primary" :disabled="saving">{{ saving ? 'Saving...' : 'Save' }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.admin-page { color: rgb(22, 1, 1); }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.btn-primary { background: var(--primary); color: #050505; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.thumb { width: 48px; height: 48px; object-fit: contain; background: rgb(7, 0, 0); border-radius: 6px; padding: 4px; }
.actions button { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgb(24, 2, 2); padding: 6px 12px; border-radius: 6px; margin-right: 8px; cursor: pointer; }
.delete-btn { border-color: rgba(248,113,113,0.4) !important; color: #f87171 !important; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; }
.modal-form { background: #0d0d0d; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px; width: 400px; display: flex; flex-direction: column; gap: 14px; }
.modal-form input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; color: white; }
.field-label { font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: -6px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 12px; }
</style>