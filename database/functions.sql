create function getoffices(starttime timestamp without time zone, endtime timestamp without time zone)
    returns TABLE(id integer, name character varying, places integer, empty_places integer)
    language plpgsql
as
$$
BEGIN
        return query
        SELECT office.id,
       office.name,
       office.places,
       office.places - (SELECT count(*) AS count
                         FROM reservation
                         WHERE reservation."officeId" = office.id
                         and ((startTime <= reservation.end_time) and (reservation.start_time <= endTime)))::integer AS empty_places
FROM office;

    END
$$;


