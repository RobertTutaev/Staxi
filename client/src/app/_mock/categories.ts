import { Category } from '../_classes/list/category';

export let Categories: Category[] = [
  {
    id: 1,
    client_id: 11,
    kateg_id: 4,
    kateg: 'Инвалиды по зрению 1-й, 2-й группы',
    doc_id: 2,
    doc: 'Справка МСЭ',
    doc_ser: 'А4',
    doc_number: '342343',
    doc_dt: Date.parse('01.01.2015'),
    dt_begin: Date.parse('01.01.2015'),
    dt_end: Date.parse('12.31.2015'),
    user_id: 11,
    user: 'А.А. Петрович',
    dt: Date.parse('04.04.2015')
  },
  {
    id: 2,
    client_id: 11,
    kateg_id: 4,
    kateg: 'Инвалиды по зрению 1-й, 2-й группы',
    doc_id: 2,
    doc: 'Справка МСЭ',
    doc_ser: 'А4',
    doc_number: '342344',
    doc_dt: Date.parse('01.01.2016'),
    dt_begin: Date.parse('01.01.2016'),
    dt_end: Date.parse('12.31.2017'),
    user_id: 11,
    user: 'О.А. Пулирян',
    dt: Date.parse('04.04.2017')
  },
  {
    id: 3,
    client_id: 12,
    kateg_id: 4,
    kateg: 'Инвалиды по зрению 1-й, 2-й группы',
    doc_id: 1,
    doc: '<Отсутствует>',
    doc_ser: null,
    doc_number: null,
    doc_dt: null,
    dt_begin: Date.parse('01.01.2017 13:00'),
    dt_end: Date.parse('13.31.2017 13:00'),
    user_id: 12,
    user: 'О.А. Акопян',
    dt: null
  },
  {
    id: 4,
    client_id: 13,
    kateg_id: 2,
    kateg: 'Один. пожилые гр. и инвалиды, временно ограниченные в передв., нужд. в прохождении курса реабилитации по показаниям врача в учреждениях здрав.',
    doc_id: 2,
    doc: 'Справка МСЭ',
    doc_ser: 'А5',
    doc_number: '122344',
    doc_dt: Date.parse('01.01.2017'),
    dt_begin: Date.parse('01.01.2017'),
    dt_end: Date.parse('12.31.2017'),
    user_id: 14,
    user: 'Р.А. Агонисян',
    dt: Date.parse('12.24.2017')
  }
];