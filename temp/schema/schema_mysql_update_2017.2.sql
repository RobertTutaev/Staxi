use staxi;

update doc set status=1 where id>0;
insert into doc (name) values 
    ('Удостоверение ветерана ВОВ'),
    ('Удостоверение инвалида ВОВ'),
    ('Удостоверение ветерана боев. действий');

update kateg set status=1 where id>0;
insert into kateg (name) values 
    ('Инвалиды 1-й группы'),
    ('Инвалиды 2-й групп с ограниченными возможностями в передвижении по заболеванию опорно-двигательного аппарата'),
    ('Инвалиды 2-й группы по зрению');
update kateg set status=0 where id in (3, 4, 5, 12, 13, 14);

update punkt set status=1 where id>0;
insert into punkt (name) values
    ('Территориальные органы государственных внебюджетных фондов'),
    ('Организации, предоставляющие населению жилищно-коммунальные услуги'),
    ('Центры занятости населения'),
    ('МАУ "МФЦ города Челябинска"');
update punkt set status=0 where id in (2);