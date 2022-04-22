import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TarefasView from '@/views/TarefasView.vue';
import ProjetosView from '@/views/ProjetosView.vue';

export const rotas: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'tarefas',
		component: TarefasView,
	},
	{
		path: '/projetos',
		name: 'projetos',
		component: ProjetosView,
	},
];

const roteador = createRouter({
	history: createWebHashHistory(),
	routes: rotas,
});

export default roteador;
