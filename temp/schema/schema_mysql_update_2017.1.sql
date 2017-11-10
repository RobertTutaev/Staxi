use staxi;

alter table doc add status tinyint(1) DEFAULT 1;
update doc set status=1 where id>0;

alter table kateg add status tinyint(1) DEFAULT 1;
update kateg set status=1 where id>0;

alter table punkt add status tinyint(1) DEFAULT 1;
update punkt set status=1 where id>0;

DROP TRIGGER if exists doc_before_update;

delimiter //

CREATE TRIGGER doc_before_update
BEFORE update ON doc
FOR EACH ROW
BEGIN
  IF new.id < 2 THEN
    IF new.name <> old.name THEN
      SET new.name = old.name;
    END IF;

    IF new.status <> old.status THEN
      SET new.status = old.status;
    END IF;
  END IF;
END
//

delimiter ;