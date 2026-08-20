<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api/axios';

const products = ref([]);
const categories = ref([]);
const loading = ref(true);
const showForm = ref(false);
const editingId = ref(null);
const uploadingImage = ref(false);

const form = ref({
    category_id: '',
    name: '',
    sku: '',
    brand: '',
    price: '',
    description: '',
    stock_quantity: 0,
    is_active: true,
});

const fetchData = async () => {
    loading.value = true;
    const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products'),
        api.get('/product-categories'),
    ]);
    products.value = productsRes.data.data;
    categories.value = categoriesRes.data.data;
    loading.value = false;
};

onMounted(fetchData);

const openCreateForm = () => {
    editingId.value = null;
    form.value = {
        category_id: categories.value[0]?.id || '',
        name: '', sku: '', brand: '', price: '',
        description: '', stock_quantity: 0, is_active: true,
    };
    showForm.value = true;
};

const openEditForm = (product) => {
    editingId.value = product.id;
    form.value = {
        category_id: product.category_id,
        name: product.name,
        sku: product.sku,
        brand: product.brand,
        price: product.price,
        description: product.description,
        stock_quantity: product.stock_quantity,
        is_active: product.is_active,
    };
    showForm.value = true;
};

const saveProduct = async () => {
    if (editingId.value) {
        await api.put(`/products/${editingId.value}`, form.value);
    } else {
        await api.post('/products', form.value);
    }
    showForm.value = false;
    await fetchData();
};

const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    await fetchData();
};

const handleImageUpload = async (event, productId) => {
    const file = event.target.files[0];
    if (!file) return;

    uploadingImage.value = true;
    const formData = new FormData();
    formData.append('image', file);

    try {
        await api.post(`/products/${productId}/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Image uploaded!');
    } catch (err) {
        alert('Upload failed.');
        console.error(err);
    } finally {
        uploadingImage.value = false;
        event.target.value = '';
    }
};
</script>

<template>
    <div class="admin-page">
        <div class="page-header">
            <h1>Products</h1>
            <button class="btn-primary" @click="openCreateForm">+ Add Product</button>
        </div>

        <div v-if="loading">Loading...</div>

        <table v-else class="data-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Active</th>
                    <th>Image</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.name }}</td>
                    <td>{{ product.brand }}</td>
                    <td>Rs. {{ product.price }}</td>
                    <td>{{ product.stock_quantity }}</td>
                    <td>{{ product.is_active ? 'Yes' : 'No' }}</td>
                    <td>
                        <input
                            type="file"
                            accept="image/*"
                            :disabled="uploadingImage"
                            @change="(e) => handleImageUpload(e, product.id)"
                        />
                    </td>
                    <td class="actions">
                        <button @click="openEditForm(product)">Edit</button>
                        <button @click="deleteProduct(product.id)" class="delete-btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
            <form class="modal-form" @submit.prevent="saveProduct">
                <h2>{{ editingId ? 'Edit' : 'Add' }} Product</h2>
                <select v-model="form.category_id" required>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
                <input v-model="form.name" placeholder="Product Name" required />
                <input v-model="form.brand" placeholder="Brand" />
                <input v-model="form.sku" placeholder="SKU" />
                <input v-model="form.price" type="number" step="0.01" placeholder="Price" required />
                <input v-model="form.stock_quantity" type="number" placeholder="Stock Quantity" />
                <textarea v-model="form.description" placeholder="Description" rows="3"></textarea>
                <label class="checkbox-label">
                    <input type="checkbox" v-model="form.is_active" /> Active
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
.admin-page { color: rgb(14, 1, 1); }
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
.data-table input[type="file"] {
    max-width: 160px;
    font-size: 0.8rem;
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
    width: 420px;
    max-height: 85vh;
    overflow-y: auto;
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