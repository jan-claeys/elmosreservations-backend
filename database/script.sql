create table if not exists company
(
    id     serial
        constraint "PK_056f7854a7afdba7cbd6d45fc20"
            primary key,
    name   varchar not null,
    street varchar not null,
    city   varchar not null
);

create table if not exists office
(
    id          serial
        constraint "PK_200185316ba169fda17e3b6ba00"
            primary key,
    name        varchar not null,
    places      integer not null,
    "companyId" integer
        constraint "FK_e3b70a473223d7f70e8e66ec6cb"
            references company
);

create table if not exists typeorm_metadata
(
    type     varchar not null,
    database varchar,
    schema   varchar,
    "table"  varchar,
    name     varchar,
    value    text
);

create table if not exists "user"
(
    id        serial
        constraint "PK_cace4a159ff9f2512dd42373760"
            primary key,
    email     varchar not null,
    password  varchar not null,
    firstname varchar not null,
    lastname  varchar not null
);

create table if not exists reservation
(
    id         serial
        constraint "PK_48b1f9922368359ab88e8bfa525"
            primary key,
    "officeId" integer
        constraint "FK_8af0ea4c2d13de3197881356253"
            references office,
    "userId"   integer
        constraint "FK_529dceb01ef681127fef04d755d"
            references "user",
    start_time timestamp not null,
    end_time   timestamp not null
);


