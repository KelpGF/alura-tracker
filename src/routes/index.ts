import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TarefasView from '@/views/TarefasView.vue';
import ProjetosIndex from '@/views/projetos/Index.vue';
import ProjetosLista from '@/views/projetos/Lista.vue';
import ProjetosForm from '@/views/projetos/Form.vue';

export const rotas: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Tarefas',
		component: TarefasView,
	},
	{
		path: '/projetos',
		name: 'Projetos',
		component: ProjetosIndex,
		children: [
			{
				path: '',
				name: 'Lista de projetos',
				component: ProjetosLista,
			},
			{
				path: 'novo',
				name: 'Novo projeto',
				component: ProjetosForm,
			},
			{
				path: ':id/editar',
				name: 'Editar projeto',
				component: ProjetosForm,
				props: true,
			},
		],
	},
];

const roteador = createRouter({
	history: createWebHashHistory(),
	routes: rotas,
});

export default roteador;
