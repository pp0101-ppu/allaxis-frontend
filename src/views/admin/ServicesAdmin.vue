<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api/axios';

const services = ref([]);
const loading = ref(true);
const showForm = ref(false);
const editingId = ref(null);

const form = ref({
    title: '',
    category: '3d_mapping',
    description: '',
    is_featured: false,
});

const fetchServices = async () => {
    loading.value = true;
    const response = await api.get('/services');
    services.value = response.data.data;
    loading.value = false;
};

onMounted(fetchServices);

const openCreateForm = () => {
    editingId.value = null;
    form.value = { title: '', category: '3d_mapping', description: '', is_featured: false };
    showForm.value = true;
};

const openEditForm = (service) => {
    editingId.value = service.id;
    form.value = {
        title: service.title,
        category: service.category,
        description: service.description,
        is_featured: service.is_featured,
    };
    showForm.value = true;
};

const saveService = async () => {
    if (editingId.value) {
        await api.put(`/services/${editingId.value}`, form.value);
    } else {
        await api.post('/services', form.value);
    }
    showForm.value = false;
    await fetchServices();
};

const deleteService = async (id) => {
    if (!confirm('Delete this service?')) return;
    await api.delete(`/services/${id}`);
    await fetchServices();
};
</script>

<template>
    <div class="admin-page">
        <div class="page-header">
            <h1>Services</h1>
            <button class="btn-primary" @click="openCreateForm">+ Add Service</button>
        </div>

        <div v-if="loading">Loading...</div>

        <table v-else class="data-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Featured</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="service in services" :key="service.id">
                    <td>{{ service.title }}</td>
                    <td>{{ service.category }}</td>
                    <td>{{ service.is_featured ? 'Yes' : 'No' }}</td>
                    <td class="actions">
                        <button @click="openEditForm(service)">Edit</button>
                        <button @click="deleteService(service.id)" class="delete-btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
            <form class="modal-form" @submit.prevent="saveService">
                <h2>{{ editingId ? 'Edit' : 'Add' }} Service</h2>
                <input v-model="form.title" placeholder="Title" required />
                <select v-model="form.category">
                    <option value="3d_mapping">3D Mapping</option>
                    <option value="web_development">Web Development</option>
                     <option value="digital_marketing">Digital Marketing</option>
                </select>
                <textarea v-model="form.description" placeholder="Description" rows="4" required></textarea>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="form.is_featured" /> Featured
                </label>
                <div class="modal-actions">
                    <button type="button" @click="showForm = false">Cancel</button>
                    <button type="submit" class="btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.admin-page { color: white; }
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}
.btn-primary {
    background: var(--primary);
    color: #050505;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
}
.data-table {
    width: 100%;
    border-collapse: collapse;
}
.data-table th, .data-table td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
}
.actions button {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15);
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    margin-right: 8px;
    cursor: pointer;
}
.delete-btn {
    border-color: rgba(248,113,113,0.4) !important;
    color: #f87171 !important;
}
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}
.modal-form {
    background: #0d0d0d;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 32px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 14px;
}
.modal-form input, .modal-form select, .modal-form textarea {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 10px;
    color: white;
}
.checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
}
.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}
</style>