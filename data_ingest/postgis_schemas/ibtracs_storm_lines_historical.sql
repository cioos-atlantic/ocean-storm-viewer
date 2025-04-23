CREATE TABLE IF NOT EXISTS public."ibtracs_historical_storm_lines" (
    "SID" VARCHAR(20) NOT NULL, 
    "SEASON" smallint NOT NULL, 
    "NUMBER" smallint NOT NULL, 
    "NAME" VARCHAR(30) NOT NULL, 
    "ISO_TIME_START" TIMESTAMP NOT NULL, 
    "ISO_TIME_END" TIMESTAMP NOT NULL, 
    "WMO_WIND_MIN" smallint, 
    "WMO_WIND_MAX" smallint, 
    "WMO_PRES_MIN" smallint, 
    "WMO_PRES_MAX" smallint, 
    "USA_SSHS_MIN" smallint, 
    "USA_SSHS_MAX" smallint, 
    geom_storm_line geometry(Linestring,4326),
    geom_storm_buffer geometry(Polygon,4326),
    PRIMARY KEY("SID")
);

-- HISTORICAL INDEXES

CREATE INDEX IF NOT EXISTS ibtracs_historical_storm_lines_name_idx
    ON public.ibtracs_historical_storm_lines 
    USING btree ("NAME" ASC NULLS LAST)
    WITH (deduplicate_items=True)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS ibtracs_historical_storm_lines_season_idx
    ON public.ibtracs_historical_storm_lines 
    USING btree ("SEASON" ASC NULLS LAST)
    WITH (deduplicate_items=True)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS ibtracs_historical_storm_lines_iso_time_idx
    ON public.ibtracs_historical_storm_lines 
    USING btree ("ISO_TIME_START" ASC NULLS LAST, "ISO_TIME_END" ASC NULLS LAST)
    WITH (deduplicate_items=True)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS ibtracs_historical_storm_lines_line_idx
    ON public.ibtracs_historical_storm_lines 
    USING GIST (geom_storm_line);

CREATE INDEX IF NOT EXISTS ibtracs_historical_storm_lines_buffer_idx
    ON public.ibtracs_historical_storm_lines 
    USING GIST (geom_storm_buffer);
