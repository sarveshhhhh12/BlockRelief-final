import axios from'axios';
const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'http://localhost:5000/api'});
export const campaigns={list:()=>api.get('/campaigns').then(r=>r.data),one:id=>api.get('/campaigns/'+id).then(r=>r.data),create:x=>api.post('/campaigns',x).then(r=>r.data)};
export const donations={list:w=>api.get(w?'/donations/'+w:'/donations').then(r=>r.data),create:x=>api.post('/donations',x).then(r=>r.data)};
export const resources={list:()=>api.get('/resources').then(r=>r.data),one:id=>api.get('/resources/'+id).then(r=>r.data),create:x=>api.post('/resources',x).then(r=>r.data),update:(id,x)=>api.put('/resources/'+id,x).then(r=>r.data),event:(id,x)=>api.post('/resources/'+id+'/events',x).then(r=>r.data)};
export const centers={list:()=>api.get('/centers').then(r=>r.data),create:x=>api.post('/centers',x).then(r=>r.data),update:(id,x)=>api.put('/centers/'+id,x).then(r=>r.data)};
export const analytics={summary:()=>api.get('/analytics/summary').then(r=>r.data),resources:()=>api.get('/analytics/resources').then(r=>r.data),donations:()=>api.get('/analytics/donations').then(r=>r.data)};
export default api;
