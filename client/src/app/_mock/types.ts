import { Type } from '../_classes/list/type';

export let Types: Type[] = [
  {
    id: 1,
    name: 'Телефон',
    mask: '^[0-9-+]+$',
    placeholder: 'nnn-nn-nn',
    style: 'glyphicon glyphicon-phone-alt'
  },
  {
    id: 2,
    name: 'Email',
    mask: '^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$',
    placeholder: 'xxx@yyy.zzz',
    style: 'glyphicon glyphicon-envelope'
  }
]
