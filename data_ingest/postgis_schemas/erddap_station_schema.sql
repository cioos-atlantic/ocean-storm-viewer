-- Table: public.erddap_cache_active

-- DROP TABLE IF EXISTS public.erddap_cache_active;

CREATE TABLE IF NOT EXISTS public.erddap_stations
(
    station_id serial,
    source character varying(100) COLLATE pg_catalog."default" NOT NULL,
    dataset character varying(100) COLLATE pg_catalog."default" NOT NULL,
    station character varying(100) COLLATE pg_catalog."default" NOT NULL,
    institution character varying(100) COLLATE pg_catalog."default" NOT NULL,
    institution_link character varying(100) ,
    extra text COLLATE pg_catalog."default",
    CONSTRAINT "PK_erddap_cache_active" PRIMARY KEY (station_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.erddap_stations
    OWNER to hurricane_dash;

COMMENT ON TABLE public.erddap_stations
    IS 'A table for storing information relating to station and dataset metadata from ERDDAP';
