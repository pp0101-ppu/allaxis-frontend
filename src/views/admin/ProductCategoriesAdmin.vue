<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api/axios';

const categories = ref([]);
const loading = ref(true);
const showForm = ref(false);
const editingId = ref(null);
const form = ref({ name: '', parent_id: null });

const fetchCategories = async () => {
    loading.value = true;
    const response = await api.get('/product-categories');
    categories.value = response.data.data;
    loading.value = false;
};

onMounted(fetchCategories);

const openCreateForm = () => {
    editingId.value = null;
    form.value = { name: '', parent_id: null };
    showForm.value = true;
};

const openEditForm = (category) => {
    editingId.value = category.id;
    form.value = { name: category.name, parent_id: category.parent_id };
    showForm.value = true;
};

const saveCategory = async () => {
    if (editingId.value) {
        await api.put(`/product-categories/${editingId.value}`, form.value);
    } else {
        await api.post('/product-categories', form.value);
    }
    showForm.value = false;
    await fetchCategories();
};

const deleteCategory = async (id) => {
    if (!confirm('Delete this category? Products inside it will need reassigning.')) return;
    await api.delete(`/product-categories/${id}`);
    await fetchCategories();
};
</script>

<template>
    <div class="admin-page">
        <div class="page-header">
            <h1>Product Categories</h1>
            <button class="btn-primary" @click="openCreateForm">+ Add Category</button>
        </div>

        <div v-if="loading">Loading...</div>

        <table v-else class="data-table">
            <thead>
                <tr><th>Name</th><th>Parent</th><th></th></tr>
            </thead>
            <tbody>
                <tr v-for="cat in categories" :key="cat.id">
                    <td>{{ cat.name }}</td>
                    <td>{{ categories.find(c => c.id === cat.parent_id)?.name || '—' }}</td>
                    <td class="actions">
                        <button @click="openEditForm(cat)">Edit</button>
                        <button @click="deleteCategory(cat.id)" class="delete-btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
            <form class="modal-form" @submit.prevent="saveCategory">
                <h2>{{ editingId ? 'Edit' : 'Add' }} Category</h2>
                <input v-model="form.name" placeholder="Category Name" required />
                <select v-model="form.parent_id">
                    <option :value="null">No Parent (Top-Level)</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
                <div class="modal-actions">
                    <button type="button" @click="showForm = false">Cancel</button>
                    <button type="submit" class="btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.admin-page { color: rgb(14, 0, 0); }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.btn-primary { background: var(--primary); color: #050505; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.actions button { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgb(8, 1, 1); padding: 6px 12px; border-radius: 6px; margin-right: 8px; cursor: pointer; }
.delete-btn { border-color: rgba(248,113,113,0.4) !important; color: #f87171 !important; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; }
.modal-form { background: #0d0d0d; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px; width: 400px; display: flex; flex-direction: column; gap: 14px; }
.modal-form input, .modal-form select { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; color: rgb(14, 0, 0); }
.modal-actions { display: flex; justify-content: flex-end; gap: 12px; }
</style>