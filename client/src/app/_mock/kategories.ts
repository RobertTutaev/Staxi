import { Kategory } from '../_classes/kategory';

export let Kategories: Kategory[] = [
  {
    id: 1,
    client_id: 11,
    kateg_id: 4,
    doc_id: 2,
    doc_ser: 'А4',
    doc_number: '342343',
    doc_dt: Date.parse('01.01.2015'),
    dt_begin: Date.parse('01.01.2015'),
    dt_end: Date.parse('12.31.2015'),
    user_id: 11,
    dt: Date.parse('04.04.2015')
  },
  {
    id: 2,
    client_id: 11,
    kateg_id: 4,
    doc_id: 2,
    doc_ser: 'А4',
    doc_number: '342344',
    doc_dt: Date.parse('01.01.2016'),
    dt_begin: Date.parse('01.01.2016'),
    dt_end: Date.parse('12.31.2017'),
    user_id: 11,
    dt: Date.parse('04.04.2017')
  },
  {
    id: 3,
    client_id: 12,
    kateg_id: 4,
    doc_id: 1,
    doc_ser: null,
    doc_number: null,
    doc_dt: null,
    dt_begin: null,
    dt_end: null,
    user_id: 12,
    dt: null
  },
  {
    id: 4,
    client_id: 13,
    kateg_id: 2,
    doc_id: 2,
    doc_ser: 'А5',
    doc_number: '122344',
    doc_dt: Date.parse('01.01.2017'),
    dt_begin: Date.parse('01.01.2017'),
    dt_end: Date.parse('12.31.2017'),
    user_id: 14,
    dt: Date.parse('12.24.2017')
  }
];