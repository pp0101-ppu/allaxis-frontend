<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api/axios';

const testimonials = ref([]);
const loading = ref(true);
const showForm = ref(false);
const editingId = ref(null);

const form = ref({
    client_name: '', client_company: '', quote: '', rating: 5, is_featured: false,
});

const fetchTestimonials = async () => {
    loading.value = true;
    const response = await api.get('/testimonials');
    testimonials.value = response.data.data;
    loading.value = false;
};

onMounted(fetchTestimonials);

const openCreateForm = () => {
    editingId.value = null;
    form.value = { client_name: '', client_company: '', quote: '', rating: 5, is_featured: false };
    showForm.value = true;
};

const openEditForm = (t) => {
    editingId.value = t.id;
    form.value = {
        client_name: t.client_name, client_company: t.client_company,
        quote: t.quote, rating: t.rating, is_featured: t.is_featured,
    };
    showForm.value = true;
};

const saveTestimonial = async () => {
    if (editingId.value) {
        await api.put(`/testimonials/${editingId.value}`, form.value);
    } else {
        await api.post('/testimonials', form.value);
    }
    showForm.value = false;
    await fetchTestimonials();
};

const deleteTestimonial = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await api.delete(`/testimonials/${id}`);
    await fetchTestimonials();
};
</script>

<template>
    <div class="admin-page">
        <div class="page-header">
            <h1>Testimonials</h1>
            <button class="btn-primary" @click="openCreateForm">+ Add Testimonial</button>
        </div>

        <div v-if="loading">Loading...</div>

        <table v-else class="data-table">
            <thead>
                <tr><th>Client</th><th>Company</th><th>Rating</th><th>Featured</th><th></th></tr>
            </thead>
            <tbody>
                <tr v-for="t in testimonials" :key="t.id">
                    <td>{{ t.client_name }}</td>
                    <td>{{ t.client_company || '—' }}</td>
                    <td>{{ t.rating }}/5</td>
                    <td>{{ t.is_featured ? 'Yes' : 'No' }}</td>
                    <td class="actions">
                        <button @click="openEditForm(t)">Edit</button>
                        <button @click="deleteTestimonial(t.id)" class="delete-btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
            <form class="modal-form" @submit.prevent="saveTestimonial">
                <h2>{{ editingId ? 'Edit' : 'Add' }} Testimonial</h2>
                <input v-model="form.client_name" placeholder="Client Name" required />
                <input v-model="form.client_company" placeholder="Client Company" />
                <textarea v-model="form.quote" placeholder="Quote" rows="3" required></textarea>
                <input v-model="form.rating" type="number" min="1" max="5" placeholder="Rating (1-5)" />
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
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.btn-primary { background: var(--primary); color: #050505; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.actions button { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: white; padding: 6px 12px; border-radius: 6px; margin-right: 8px; cursor: pointer; }
.delete-btn { border-color: rgba(248,113,113,0.4) !important; color: #f87171 !important; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; }
.modal-form { background: #0d0d0d; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px; width: 400px; display: flex; flex-direction: column; gap: 14px; }
.modal-form input, .modal-form textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; color: white; }
.checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }
.modal-actions { display: flex; justify-content: flex-end; gap: 12px; }
</style>