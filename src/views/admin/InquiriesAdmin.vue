<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api/axios';

const inquiries = ref([]);
const loading = ref(true);
const statusFilter = ref('');

const fetchInquiries = async () => {
    loading.value = true;
    const params = statusFilter.value ? { status: statusFilter.value } : {};
    const response = await api.get('/inquiries', { params });
    inquiries.value = response.data.data;
    loading.value = false;
};

onMounted(fetchInquiries);

const updateStatus = async (inquiry, newStatus) => {
    await api.put(`/inquiries/${inquiry.id}`, { status: newStatus });
    await fetchInquiries();
};

const deleteInquiry = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    await api.delete(`/inquiries/${id}`);
    await fetchInquiries();
};
</script>

<template>
    <div class="admin-page">
        <div class="page-header">
            <h1>Inquiries</h1>
            <select v-model="statusFilter" @change="fetchInquiries">
                <option value="">All</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
            </select>
        </div>

        <div v-if="loading">Loading...</div>
        <div v-else-if="inquiries.length === 0">No inquiries found.</div>

        <table v-else class="data-table">
            <thead>
                <tr><th>Name</th><th>Contact</th><th>Type</th><th>Message</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
                <tr v-for="inq in inquiries" :key="inq.id">
                    <td>{{ inq.name }}</td>
                    <td>{{ inq.email }}<br><span class="muted">{{ inq.phone }}</span></td>
                    <td>{{ inq.type }}</td>
                    <td class="message-cell">{{ inq.message }}</td>
                    <td>
                        <select :value="inq.status" @change="updateStatus(inq, $event.target.value)">
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                        </select>
                    </td>
                    <td>
                        <button @click="deleteInquiry(inq.id)" class="delete-btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.admin-page { color: rgb(20, 1, 1); }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-header select { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 12px; color: rgb(15, 0, 0); }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); vertical-align: top; }
.message-cell { max-width: 260px; font-size: 0.85rem; color: rgba(10, 0, 0, 0.7); }
.muted { color: rgba(12, 1, 1, 0.5); font-size: 0.85rem; }
.data-table select { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 6px 8px; color: rgb(32, 1, 1); }
.delete-btn { background: transparent; border: 1px solid rgba(248,113,113,0.4); color: #f87171; padding: 6px 12px; border-radius: 6px; cursor: pointer; }
</style>