--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(30) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO postgres;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO postgres;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: ttApp_cvabilities; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."ttApp_cvabilities" (
    "cvAbilitiesId" integer NOT NULL,
    "cvAbility" character varying(100) NOT NULL,
    "cvCVId" integer NOT NULL
);


ALTER TABLE public."ttApp_cvabilities" OWNER TO postgres;

--
-- Name: ttApp_cvabilities_cvAbilitiesId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ttApp_cvabilities_cvAbilitiesId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ttApp_cvabilities_cvAbilitiesId_seq" OWNER TO postgres;

--
-- Name: ttApp_cvabilities_cvAbilitiesId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ttApp_cvabilities_cvAbilitiesId_seq" OWNED BY public."ttApp_cvabilities"."cvAbilitiesId";


--
-- Name: ttApp_cvacademicexperience; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."ttApp_cvacademicexperience" (
    "cvAcademicExpId" integer NOT NULL,
    "cvLevel" character varying(100) NOT NULL,
    "cvInstitute" character varying(100) NOT NULL,
    "cvDegree" character varying(100) NOT NULL,
    "cvInitDate" timestamp with time zone NOT NULL,
    "cvEndDate" timestamp with time zone NOT NULL,
    "cvIsActive" boolean NOT NULL,
    "cvCVId" integer NOT NULL
);


ALTER TABLE public."ttApp_cvacademicexperience" OWNER TO postgres;

--
-- Name: ttApp_cvacademicexperience_cvAcademicExpId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ttApp_cvacademicexperience_cvAcademicExpId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ttApp_cvacademicexperience_cvAcademicExpId_seq" OWNER TO postgres;

--
-- Name: ttApp_cvacademicexperience_cvAcademicExpId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ttApp_cvacademicexperience_cvAcademicExpId_seq" OWNED BY public."ttApp_cvacademicexperience"."cvAcademicExpId";


--
-- Name: ttApp_cvadminuser; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."ttApp_cvadminuser" (
    "cvUserAdminId" integer NOT NULL,
    "cvJobTittle" character varying(50) NOT NULL,
    "cvIsRecruiter" boolean NOT NULL,
    "cvCompanyId" integer,
    "cvUserId" integer
);


ALTER TABLE public."ttApp_cvadminuser" OWNER TO postgres;

--
-- Name: ttApp_cvadminuser_cvUserAdminId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ttApp_cvadminuser_cvUserAdminId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ttApp_cvadminuser_cvUserAdminId_seq" OWNER TO postgres;

--
-- Name: ttApp_cvadminuser_cvUserAdminId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ttApp_cvadminuser_cvUserAdminId_seq" OWNED BY public."ttApp_cvadminuser"."cvUserAdminId";


--
-- Name: ttApp_cvcompany; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."ttApp_cvcompany" (
    "cvCompanyId" integer NOT NULL,
    "cvName" character varying(30) NOT NULL,
    "cvAddress" character varying(100) NOT NULL,
    "cvKind" character varying(20) NOT NULL
);


ALTER TABLE public."ttApp_cvcompany" OWNER TO postgres;

--
-- Name: ttApp_cvcompany_cvCompanyId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ttApp_cvcompany_cvCompanyId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ttApp_cvcompany_cvCompanyId_seq" OWNER TO postgres;

--
-- Name: ttApp_cvcompany_cvCompanyId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ttApp_cvcompany_cvCompanyId_seq" OWNED BY public."ttApp_cvcompany"."cvCompanyId";


--
-- Name: ttApp_cvcurriculumvitae; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."ttApp_cvcurriculumvitae" (
    "cvCVId" integer NOT NULL,
    "cvOtherInfo" character varying(500) NOT NULL,
    "cvUserPostulantId" integer,
    "cvProfessionalObj" character varying(500) NOT NULL
);


ALTER TABLE public."ttApp_cvcurriculumvitae" OWNER TO postgres;

--
-- Name: ttApp_cvcurriculumvitae_cvCVId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ttApp_cvcurriculumvitae_cvCVId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ttApp_cvcurriculumvitae_cvCVId_seq" OWNER TO postgres;

--
-- Name: ttApp_cvcurriculumvitae_cvCVId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ttApp_cvcurriculumvitae_cvCVId_seq" OWNED BY public."ttApp_cvcurriculumvitae"."cvCVId";


--
-- Name: ttApp_cvjoboffers; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."ttApp_cvjoboffers" (
    "cvJobOfferId" integer NOT NULL,
    "cvCreationDate" timestamp with time zone NOT NULL,
    "cvExpirationDate" timestamp with time zone NOT NULL,
    "cvMaxPostulant" integer,
    "cvDescription" character varying(999),
    "cvIsActive" boolean NOT NULL,
    "cvTittle" character varying(100),
    "cvSalary" character varying(30),
    "cvCompanyId" integer,
    "cvUserAdminId" integer,
    "cvAgeOffer" character varying(30),
    "cvExperiences" character varying(30)
);


ALTER TABLE public."ttApp_cvjoboffers" OWNER TO postgres;

--
-- Name: ttApp_cvjoboffers_cvJobOfferId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ttApp_cvjoboffers_cvJobOfferId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ttApp_cvjoboffers_cvJobOfferId_seq" OWNER TO postgres;

--
-- Name: ttApp_cvjoboffers_cvJobOfferId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ttApp_cvjoboffers_cvJobOfferId_seq" OWNED BY public."ttApp_cvjoboffers"."cvJobOfferId";


--
-- Name: ttApp_cvlanguages; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."ttApp_cvlanguages" (
    "cvLanguagesId" integer NOT NULL,
    "cvLanguage" character varying(100) NOT NULL,
    "cvLevel" character varying(100) NOT NULL,
    "cvCVId" integer NOT NULL
);


ALTER TABLE public."ttApp_cvlanguages" OWNER TO postgres;

--
-- Name: ttApp_cvlanguages_cvLanguagesId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ttApp_cvlanguages_cvLanguagesId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ttApp_cvlanguages_cvLanguagesId_seq" OWNER TO postgres;

--
-- Name: ttApp_cvlanguages_cvLanguagesId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ttApp_cvlanguages_cvLanguagesId_seq" OWNED BY public."ttApp_cvlanguages"."cvLanguagesId";


--
-- Name: ttApp_cvtools; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."ttApp_cvtools" (
    "cvToolsId" integer NOT NULL,
    cvtool character varying(100) NOT NULL,
    "cvCVId" integer NOT NULL
);


ALTER TABLE public."ttApp_cvtools" OWNER TO postgres;

--
-- Name: ttApp_cvtools_cvToolsId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ttApp_cvtools_cvToolsId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ttApp_cvtools_cvToolsId_seq" OWNER TO postgres;

--
-- Name: ttApp_cvtools_cvToolsId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ttApp_cvtools_cvToolsId_seq" OWNED BY public."ttApp_cvtools"."cvToolsId";


--
-- Name: ttApp_cvuser; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."ttApp_cvuser" (
    "cvUserId" integer NOT NULL,
    "cvActive" boolean NOT NULL,
    "cvKind" character varying(15) NOT NULL,
    "cvName" character varying(50) NOT NULL,
    "cvAge" integer,
    "cvMail" character varying(50),
    "cvPhone" character varying(20),
    "cvMobilePhone" character varying(20),
    "cvUserAccess" character varying(20) NOT NULL,
    "cvPassAccess" character varying(25) NOT NULL,
    "cvAddress" character varying(100) NOT NULL
);


ALTER TABLE public."ttApp_cvuser" OWNER TO postgres;

--
-- Name: ttApp_cvuser_cvUserId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ttApp_cvuser_cvUserId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ttApp_cvuser_cvUserId_seq" OWNER TO postgres;

--
-- Name: ttApp_cvuser_cvUserId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ttApp_cvuser_cvUserId_seq" OWNED BY public."ttApp_cvuser"."cvUserId";


--
-- Name: ttApp_cvuserpostulant; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."ttApp_cvuserpostulant" (
    "cvUserPostulantId" integer NOT NULL,
    "cvCURP" character varying(18) NOT NULL,
    "cvRFC" character varying(13) NOT NULL,
    "cvNSS" character varying(18) NOT NULL,
    "cvUserId" integer
);


ALTER TABLE public."ttApp_cvuserpostulant" OWNER TO postgres;

--
-- Name: ttApp_cvuserpostulant_cvUserPostulantId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ttApp_cvuserpostulant_cvUserPostulantId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ttApp_cvuserpostulant_cvUserPostulantId_seq" OWNER TO postgres;

--
-- Name: ttApp_cvuserpostulant_cvUserPostulantId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ttApp_cvuserpostulant_cvUserPostulantId_seq" OWNED BY public."ttApp_cvuserpostulant"."cvUserPostulantId";


--
-- Name: ttApp_cvworkexperience; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE public."ttApp_cvworkexperience" (
    "cvworkExpId" integer NOT NULL,
    "cvJobTittle" character varying(100) NOT NULL,
    "cvCompanyName" character varying(100) NOT NULL,
    "cvActivities" character varying(999) NOT NULL,
    "cvInitDate" timestamp with time zone NOT NULL,
    "cvEndDate" timestamp with time zone NOT NULL,
    "cvIsActive" boolean NOT NULL,
    "cvCVId" integer NOT NULL
);


ALTER TABLE public."ttApp_cvworkexperience" OWNER TO postgres;

--
-- Name: ttApp_cvworkexperience_cvworkExpId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ttApp_cvworkexperience_cvworkExpId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ttApp_cvworkexperience_cvworkExpId_seq" OWNER TO postgres;

--
-- Name: ttApp_cvworkexperience_cvworkExpId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ttApp_cvworkexperience_cvworkExpId_seq" OWNED BY public."ttApp_cvworkexperience"."cvworkExpId";


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: cvAbilitiesId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvabilities" ALTER COLUMN "cvAbilitiesId" SET DEFAULT nextval('public."ttApp_cvabilities_cvAbilitiesId_seq"'::regclass);


--
-- Name: cvAcademicExpId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvacademicexperience" ALTER COLUMN "cvAcademicExpId" SET DEFAULT nextval('public."ttApp_cvacademicexperience_cvAcademicExpId_seq"'::regclass);


--
-- Name: cvUserAdminId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvadminuser" ALTER COLUMN "cvUserAdminId" SET DEFAULT nextval('public."ttApp_cvadminuser_cvUserAdminId_seq"'::regclass);


--
-- Name: cvCompanyId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvcompany" ALTER COLUMN "cvCompanyId" SET DEFAULT nextval('public."ttApp_cvcompany_cvCompanyId_seq"'::regclass);


--
-- Name: cvCVId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvcurriculumvitae" ALTER COLUMN "cvCVId" SET DEFAULT nextval('public."ttApp_cvcurriculumvitae_cvCVId_seq"'::regclass);


--
-- Name: cvJobOfferId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvjoboffers" ALTER COLUMN "cvJobOfferId" SET DEFAULT nextval('public."ttApp_cvjoboffers_cvJobOfferId_seq"'::regclass);


--
-- Name: cvLanguagesId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvlanguages" ALTER COLUMN "cvLanguagesId" SET DEFAULT nextval('public."ttApp_cvlanguages_cvLanguagesId_seq"'::regclass);


--
-- Name: cvToolsId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvtools" ALTER COLUMN "cvToolsId" SET DEFAULT nextval('public."ttApp_cvtools_cvToolsId_seq"'::regclass);


--
-- Name: cvUserId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvuser" ALTER COLUMN "cvUserId" SET DEFAULT nextval('public."ttApp_cvuser_cvUserId_seq"'::regclass);


--
-- Name: cvUserPostulantId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvuserpostulant" ALTER COLUMN "cvUserPostulantId" SET DEFAULT nextval('public."ttApp_cvuserpostulant_cvUserPostulantId_seq"'::regclass);


--
-- Name: cvworkExpId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvworkexperience" ALTER COLUMN "cvworkExpId" SET DEFAULT nextval('public."ttApp_cvworkexperience_cvworkExpId_seq"'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can add permission	2	add_permission
5	Can change permission	2	change_permission
6	Can delete permission	2	delete_permission
7	Can add group	3	add_group
8	Can change group	3	change_group
9	Can delete group	3	delete_group
10	Can add user	4	add_user
11	Can change user	4	change_user
12	Can delete user	4	delete_user
13	Can add content type	5	add_contenttype
14	Can change content type	5	change_contenttype
15	Can delete content type	5	delete_contenttype
16	Can add session	6	add_session
17	Can change session	6	change_session
18	Can delete session	6	delete_session
19	Can add Usuario	7	add_cvuser
20	Can change Usuario	7	change_cvuser
21	Can delete Usuario	7	delete_cvuser
25	Can add Usuario Postulante	9	add_cvuserpostulant
26	Can change Usuario Postulante	9	change_cvuserpostulant
27	Can delete Usuario Postulante	9	delete_cvuserpostulant
28	Can add Empresa	10	add_cvcompany
29	Can change Empresa	10	change_cvcompany
30	Can delete Empresa	10	delete_cvcompany
31	Can add CV	11	add_cvcurriculumvitae
32	Can change CV	11	change_cvcurriculumvitae
33	Can delete CV	11	delete_cvcurriculumvitae
34	Can add Oferta laboral	12	add_cvjoboffers
35	Can change Oferta laboral	12	change_cvjoboffers
36	Can delete Oferta laboral	12	delete_cvjoboffers
37	Can add Usuario Administrador	13	add_cvadminuser
38	Can change Usuario Administrador	13	change_cvadminuser
39	Can delete Usuario Administrador	13	delete_cvadminuser
40	Can add Experiencia Academica	14	add_cvacademicexperience
41	Can change Experiencia Academica	14	change_cvacademicexperience
42	Can delete Experiencia Academica	14	delete_cvacademicexperience
43	Can add Experiencia Laboral	15	add_cvworkexperience
44	Can change Experiencia Laboral	15	change_cvworkexperience
45	Can delete Experiencia Laboral	15	delete_cvworkexperience
46	Can add Habilidad	16	add_cvabilities
47	Can change Habilidad	16	change_cvabilities
48	Can delete Habilidad	16	delete_cvabilities
49	Can add Herramienta	17	add_cvtools
50	Can change Herramienta	17	change_cvtools
51	Can delete Herramienta	17	delete_cvtools
52	Can add Idioma	18	add_cvlanguages
53	Can change Idioma	18	change_cvlanguages
54	Can delete Idioma	18	delete_cvlanguages
\.


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 54, true);


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$20000$zp3x8DzW5Xsj$glGW/p76+EbD6KnFfZI9s0mdN5rKokJv/JCvmlCUOIg=	2021-01-02 14:50:10.158225-06	t	gponce			gponceg19@gmail.com	t	t	2020-03-26 17:16:06.133152-06
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2020-06-05 20:20:37.63-05	6	German Ponce Garcia	3		7	1
2	2020-06-05 20:20:37.651896-05	3	Enrique Ochoa Hernandez	3		7	1
3	2020-06-06 21:31:19.321583-05	7	German Ponce Garcia	3		7	1
4	2020-06-06 21:31:19.336582-05	1	German Ponce Garcia	3		7	1
5	2020-06-07 18:25:54.715403-05	8	German Ponce Garcia	3		7	1
6	2020-06-07 18:28:47.812427-05	9	JAKDHAS	2	Changed cvKind.	7	1
7	2020-06-07 18:31:46.498583-05	11	JKHASD	3		7	1
8	2020-06-07 18:31:46.505756-05	10	jhgd	3		7	1
9	2020-06-07 18:31:46.508033-05	9	JAKDHAS	3		7	1
10	2020-12-15 12:59:18.204939-06	16	German Ponce Garcia	2	Changed cvAge and cvMobilePhone.	7	1
11	2020-12-15 13:00:05.169174-06	1	1	1		9	1
12	2020-12-15 13:07:59.993148-06	1	1	1		11	1
13	2020-12-15 13:11:06.374253-06	16	German Ponce Garcia	2	Changed cvPhone and cvAddress.	7	1
14	2020-12-15 15:02:10.57534-06	16	German Ponce Garcia	2	Changed cvActive.	7	1
15	2020-12-15 15:02:50.462162-06	16	German Ponce Garcia	2	Changed cvActive.	7	1
16	2020-12-15 18:17:15.788373-06	16	German Ponce Garcia	2	Changed cvPhone.	7	1
17	2020-12-15 22:15:33.018748-06	18	julio ponce	3		7	1
18	2020-12-15 22:20:57.68931-06	2	2	3		9	1
19	2020-12-15 22:21:07.139902-06	19	julio ponce	3		7	1
20	2020-12-15 22:21:07.148391-06	17	Julio Cesar Ponce Garcia	3		7	1
21	2020-12-16 14:36:24.40211-06	1	1	2	Added Habilidad "3". Added Habilidad "4".	11	1
22	2020-12-16 14:36:56.040824-06	1	1	2	Added Habilidad "5".	11	1
23	2020-12-28 22:20:36.57704-06	1	1	1		12	1
24	2020-12-28 22:21:26.642103-06	2	2	1		12	1
25	2020-12-28 22:22:42.724173-06	1	RevePos	1		10	1
26	2020-12-28 22:48:03.607055-06	3	3	1		12	1
27	2020-12-28 22:55:36.589131-06	1	1	2	Changed cvTittle.	12	1
28	2020-12-28 22:55:49.021751-06	2	2	2	Changed cvTittle.	12	1
29	2020-12-28 22:56:02.847956-06	3	3	2	Changed cvTittle.	12	1
30	2020-12-28 23:17:17.381951-06	1	1	2	Changed cvSalary.	12	1
31	2020-12-29 13:06:24.587993-06	1	1	2	Changed cvUserAdminId and cvCompanyId.	12	1
32	2020-12-29 13:06:30.212084-06	2	2	2	Changed cvUserAdminId and cvCompanyId.	12	1
33	2020-12-29 13:06:35.236068-06	3	3	2	Changed cvUserAdminId and cvCompanyId.	12	1
34	2020-12-30 23:11:26.003525-06	3	3	1		13	1
35	2021-01-02 15:17:40.486687-06	2	2	2	Changed cvCompanyId, cvJobTittle and cvIsRecruiter.	13	1
36	2021-01-02 15:55:44.202042-06	4	4	1		13	1
37	2021-01-02 20:34:38.166401-06	3	3	2	Changed cvUserAdminId.	12	1
\.


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 37, true);


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	ttApp	cvuser
9	ttApp	cvuserpostulant
10	ttApp	cvcompany
11	ttApp	cvcurriculumvitae
12	ttApp	cvjoboffers
13	ttApp	cvadminuser
14	ttApp	cvacademicexperience
15	ttApp	cvworkexperience
16	ttApp	cvabilities
17	ttApp	cvtools
18	ttApp	cvlanguages
\.


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 18, true);


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
40	contenttypes	0001_initial	2021-01-02 19:33:52.904549-06
41	auth	0001_initial	2021-01-02 19:33:52.919544-06
42	admin	0001_initial	2021-01-02 19:33:52.927564-06
43	contenttypes	0002_remove_content_type_name	2021-01-02 19:33:52.932562-06
44	auth	0002_alter_permission_name_max_length	2021-01-02 19:33:52.940159-06
45	auth	0003_alter_user_email_max_length	2021-01-02 19:33:52.955048-06
46	auth	0004_alter_user_username_opts	2021-01-02 19:33:52.970916-06
47	auth	0005_alter_user_last_login_null	2021-01-02 19:33:52.985593-06
48	auth	0006_require_contenttypes_0002	2021-01-02 19:33:53.002541-06
49	sessions	0001_initial	2021-01-02 19:33:53.019165-06
50	ttApp	0001_initial	2021-01-02 19:33:57.634676-06
51	ttApp	0002_auto_20210102_1934	2021-01-02 19:34:16.701325-06
\.


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 51, true);


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
pg9u9b06zhokr3xkex4la2jg58ihqa7s	NmY5YTEwMDAyYjJjNmIyNDcyYmY4NmFhN2EzNDcyMmU1NTk2NTM1Yzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzODQ0NDZjN2M5MzYyZjRlZDgyM2U5MGRkNGI1MDA1YmU5NzA2YWNkIn0=	2020-04-09 18:16:19.097704-05
lb8mavhwsdpqqtixan3wg0z7fhepamph	NmY5YTEwMDAyYjJjNmIyNDcyYmY4NmFhN2EzNDcyMmU1NTk2NTM1Yzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzODQ0NDZjN2M5MzYyZjRlZDgyM2U5MGRkNGI1MDA1YmU5NzA2YWNkIn0=	2020-04-09 18:27:50.071493-05
z37044wyc011bsbueqty912fex98mcsw	NmY5YTEwMDAyYjJjNmIyNDcyYmY4NmFhN2EzNDcyMmU1NTk2NTM1Yzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzODQ0NDZjN2M5MzYyZjRlZDgyM2U5MGRkNGI1MDA1YmU5NzA2YWNkIn0=	2020-06-21 18:28:27.608517-05
v6x27l7qfcbqjpnr1i5tupp1vd4rmpgm	NmY5YTEwMDAyYjJjNmIyNDcyYmY4NmFhN2EzNDcyMmU1NTk2NTM1Yzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzODQ0NDZjN2M5MzYyZjRlZDgyM2U5MGRkNGI1MDA1YmU5NzA2YWNkIn0=	2020-11-28 21:21:52.032403-06
x604kl2apld3bm0gsh908yscrklol0ar	NmY5YTEwMDAyYjJjNmIyNDcyYmY4NmFhN2EzNDcyMmU1NTk2NTM1Yzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzODQ0NDZjN2M5MzYyZjRlZDgyM2U5MGRkNGI1MDA1YmU5NzA2YWNkIn0=	2020-12-17 10:00:59.821049-06
xge0x2bmt3dzisoavurw71iz5h887y7n	NmY5YTEwMDAyYjJjNmIyNDcyYmY4NmFhN2EzNDcyMmU1NTk2NTM1Yzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzODQ0NDZjN2M5MzYyZjRlZDgyM2U5MGRkNGI1MDA1YmU5NzA2YWNkIn0=	2020-12-19 14:22:40.482229-06
sonobw5st6nmwwfck1zlhaztx2as9trq	NmY5YTEwMDAyYjJjNmIyNDcyYmY4NmFhN2EzNDcyMmU1NTk2NTM1Yzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzODQ0NDZjN2M5MzYyZjRlZDgyM2U5MGRkNGI1MDA1YmU5NzA2YWNkIn0=	2020-12-19 14:37:20.589368-06
e9wuutn8o09xugezbccud1wp8j1c2qey	NmY5YTEwMDAyYjJjNmIyNDcyYmY4NmFhN2EzNDcyMmU1NTk2NTM1Yzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzODQ0NDZjN2M5MzYyZjRlZDgyM2U5MGRkNGI1MDA1YmU5NzA2YWNkIn0=	2021-01-11 22:18:06.355195-06
4z7ovsfjw1zjrkvo6nn4ygs7srnl56f9	NmY5YTEwMDAyYjJjNmIyNDcyYmY4NmFhN2EzNDcyMmU1NTk2NTM1Yzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzODQ0NDZjN2M5MzYyZjRlZDgyM2U5MGRkNGI1MDA1YmU5NzA2YWNkIn0=	2021-01-16 14:50:10.162941-06
\.


--
-- Data for Name: ttApp_cvabilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ttApp_cvabilities" ("cvAbilitiesId", "cvAbility", "cvCVId") FROM stdin;
1	Trabajo en equipoj	1
2	hjkhj	1
13	kjhdkasjhdhjksajkhd	1
14	jhasdkjasd	1
\.


--
-- Name: ttApp_cvabilities_cvAbilitiesId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ttApp_cvabilities_cvAbilitiesId_seq"', 14, true);


--
-- Data for Name: ttApp_cvacademicexperience; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ttApp_cvacademicexperience" ("cvAcademicExpId", "cvLevel", "cvInstitute", "cvDegree", "cvInitDate", "cvEndDate", "cvIsActive", "cvCVId") FROM stdin;
2	Universidad	ESCOM IPN	Ingeniero en Sistemas Computacionales	2015-01-14 18:00:00-06	2020-12-14 18:00:00-06	t	1
1	Bachillerato	CECyT 12 IPN	Tecnico en Informatica	2011-06-11 19:00:00-05	2014-06-11 19:00:00-05	f	1
\.


--
-- Name: ttApp_cvacademicexperience_cvAcademicExpId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ttApp_cvacademicexperience_cvAcademicExpId_seq"', 8, true);


--
-- Data for Name: ttApp_cvadminuser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ttApp_cvadminuser" ("cvUserAdminId", "cvJobTittle", "cvIsRecruiter", "cvCompanyId", "cvUserId") FROM stdin;
3	Gerente	f	1	12
2	Reclutador Jr	t	1	21
4	Reclutador Jr	t	1	14
\.


--
-- Name: ttApp_cvadminuser_cvUserAdminId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ttApp_cvadminuser_cvUserAdminId_seq"', 4, true);


--
-- Data for Name: ttApp_cvcompany; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ttApp_cvcompany" ("cvCompanyId", "cvName", "cvAddress", "cvKind") FROM stdin;
1	RevePos	venustiano Carranza	Software
\.


--
-- Name: ttApp_cvcompany_cvCompanyId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ttApp_cvcompany_cvCompanyId_seq"', 1, true);


--
-- Data for Name: ttApp_cvcurriculumvitae; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ttApp_cvcurriculumvitae" ("cvCVId", "cvOtherInfo", "cvUserPostulantId", "cvProfessionalObj") FROM stdin;
2		3	
1	etc	1	Actualmente me encuentro terminando la parte final de mi trabajo de titulacion, y llevo dos años y medio trabajando como Web Developer. Me apasiona aprender nuevas tecnologias y herramientas, y siempre trato de hacerlo lo mas rapido posible.
\.


--
-- Name: ttApp_cvcurriculumvitae_cvCVId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ttApp_cvcurriculumvitae_cvCVId_seq"', 2, true);


--
-- Data for Name: ttApp_cvjoboffers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ttApp_cvjoboffers" ("cvJobOfferId", "cvCreationDate", "cvExpirationDate", "cvMaxPostulant", "cvDescription", "cvIsActive", "cvTittle", "cvSalary", "cvCompanyId", "cvUserAdminId", "cvAgeOffer", "cvExperiences") FROM stdin;
1	2020-12-28 16:19:23-06	2020-12-28 16:19:23-06	100	Experiencia en uso de servicios basados en REST API  Experiencia en trabajo colaborativo con GIT  Experiencia básica en manejo de servidores NGINX, GUNICORN    Conocimientos avanzados en programación en Python (al menos 3 años de experiencia)  Conocimientos avanzados en programación en Javascript  Excelente manejo de frameworks de programación web, tales como: Django, Angular, JQuery  Conocimiento avanzado de HTML (al menos 3 años de experiencia)  Conocimiento general en CSS  Conocimiento deseable en tecnologías Azure  Conocimiento avanzado de Bases de Datos, principalmente Postgres, MariaDB, MySQL (al menos 3 años de experiencia)  Conocimientos generales en OAUTH2    Lugar de trabajo: Lago Alberto, Anáhuac, 11320 CDMX.	t	 Desarrollador Web	$20,000 - $30,000	1	2	 	 
2	2020-12-28 16:20:42-06	2020-12-28 16:20:42-06	100	Ingeniería en Sistemas o afin (No licenciaturas) Experiencia mayor a 4 años Ingles Intermedio programación orientada a objetos, python conocimiento de frameworks como Django, Flask Integración de servicios, microservicios, bases de datos relacionales y no relacionales APIS desarrollo de procesamiento de datos procesos batch conocimeinto de Librerias Python	t	 FullStack Developer	0	1	2	 	 
3	2020-12-28 16:47:51-06	2020-12-28 16:47:51-06	100	Experiencia en uso de servicios basados en REST API Experiencia en trabajo colaborativo con GIT Experiencia básica en manejo de servidores NGINX, GUNICORN Conocimientos avanzados en programación en Python (al menos 3 años de experiencia) Conocimientos avanzados en programación en Javascript Excelente manejo de frameworks de programación web, tales como: Django, Angular, JQuery Conocimiento avanzado de HTML (al menos 3 años de experiencia) Conocimiento general en CSS Conocimiento deseable en tecnologías Azure Conocimiento avanzado de Bases de Datos, principalmente Postgres, MariaDB	t	 Desarrollador Junior	0	1	4	 	 
\.


--
-- Name: ttApp_cvjoboffers_cvJobOfferId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ttApp_cvjoboffers_cvJobOfferId_seq"', 3, true);


--
-- Data for Name: ttApp_cvlanguages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ttApp_cvlanguages" ("cvLanguagesId", "cvLanguage", "cvLevel", "cvCVId") FROM stdin;
1	Ingles	Intermedio	1
2	Español	Nativo	1
\.


--
-- Name: ttApp_cvlanguages_cvLanguagesId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ttApp_cvlanguages_cvLanguagesId_seq"', 4, true);


--
-- Data for Name: ttApp_cvtools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ttApp_cvtools" ("cvToolsId", cvtool, "cvCVId") FROM stdin;
3	javascript	1
1	Python	1
2	cpp	1
\.


--
-- Name: ttApp_cvtools_cvToolsId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ttApp_cvtools_cvToolsId_seq"', 10, true);


--
-- Data for Name: ttApp_cvuser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ttApp_cvuser" ("cvUserId", "cvActive", "cvKind", "cvName", "cvAge", "cvMail", "cvPhone", "cvMobilePhone", "cvUserAccess", "cvPassAccess", "cvAddress") FROM stdin;
12	t	ADMINISTRADOR	German Ponce Garcia	\N	gponceg19@gmail.com	\N	\N	geerman	geerman	
14	t	ADMINISTRADOR	Miguel Hernandez Ochoa	\N	miguel28@gmail.com	\N	\N	miguel	miguel	
16	t	POSTULANTE	German Ponce Garcia	24	gponce19_@outlook.com		5614850923	geermaan	geerman	Rio Amazonas 4 Mz 2 Lt 4 Corte Portezuelos 56335 Chimalhuacan
20	t	POSTULANTE	julio ponce	\N	jponce@gmail.com	\N	\N	jponce	jponce	
21	t	ADMINISTRADOR	Julio Cesar Ponce Garcia	\N	gponc@gmail.com	\N	\N	gponce	gponce	
\.


--
-- Name: ttApp_cvuser_cvUserId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ttApp_cvuser_cvUserId_seq"', 21, true);


--
-- Data for Name: ttApp_cvuserpostulant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ttApp_cvuserpostulant" ("cvUserPostulantId", "cvCURP", "cvRFC", "cvNSS", "cvUserId") FROM stdin;
1	POGG960819HDFNRR00	POGG960819UK6	123456	16
3				20
\.


--
-- Name: ttApp_cvuserpostulant_cvUserPostulantId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ttApp_cvuserpostulant_cvUserPostulantId_seq"', 3, true);


--
-- Data for Name: ttApp_cvworkexperience; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ttApp_cvworkexperience" ("cvworkExpId", "cvJobTittle", "cvCompanyName", "cvActivities", "cvInitDate", "cvEndDate", "cvIsActive", "cvCVId") FROM stdin;
1	Web Developer	RevePOS	asjdakshdakjshd	2018-07-15 08:00:15-05	2020-12-15 07:00:15-06	t	1
\.


--
-- Name: ttApp_cvworkexperience_cvworkExpId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ttApp_cvworkexperience_cvworkExpId_seq"', 2, true);


--
-- Name: auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions_group_id_permission_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_key UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission_content_type_id_codename_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_key UNIQUE (content_type_id, codename);


--
-- Name: auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups_user_id_group_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_key UNIQUE (user_id, group_id);


--
-- Name: auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions_user_id_permission_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_key UNIQUE (user_id, permission_id);


--
-- Name: auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type_app_label_17ab7f67c1c783b3_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_17ab7f67c1c783b3_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: ttApp_cvabilities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvabilities"
    ADD CONSTRAINT "ttApp_cvabilities_pkey" PRIMARY KEY ("cvAbilitiesId");


--
-- Name: ttApp_cvacademicexperience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvacademicexperience"
    ADD CONSTRAINT "ttApp_cvacademicexperience_pkey" PRIMARY KEY ("cvAcademicExpId");


--
-- Name: ttApp_cvadminuser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvadminuser"
    ADD CONSTRAINT "ttApp_cvadminuser_pkey" PRIMARY KEY ("cvUserAdminId");


--
-- Name: ttApp_cvcompany_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvcompany"
    ADD CONSTRAINT "ttApp_cvcompany_pkey" PRIMARY KEY ("cvCompanyId");


--
-- Name: ttApp_cvcurriculumvitae_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvcurriculumvitae"
    ADD CONSTRAINT "ttApp_cvcurriculumvitae_pkey" PRIMARY KEY ("cvCVId");


--
-- Name: ttApp_cvjoboffers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvjoboffers"
    ADD CONSTRAINT "ttApp_cvjoboffers_pkey" PRIMARY KEY ("cvJobOfferId");


--
-- Name: ttApp_cvlanguages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvlanguages"
    ADD CONSTRAINT "ttApp_cvlanguages_pkey" PRIMARY KEY ("cvLanguagesId");


--
-- Name: ttApp_cvtools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvtools"
    ADD CONSTRAINT "ttApp_cvtools_pkey" PRIMARY KEY ("cvToolsId");


--
-- Name: ttApp_cvuser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvuser"
    ADD CONSTRAINT "ttApp_cvuser_pkey" PRIMARY KEY ("cvUserId");


--
-- Name: ttApp_cvuserpostulant_cvCURP_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvuserpostulant"
    ADD CONSTRAINT "ttApp_cvuserpostulant_cvCURP_key" UNIQUE ("cvCURP");


--
-- Name: ttApp_cvuserpostulant_cvNSS_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvuserpostulant"
    ADD CONSTRAINT "ttApp_cvuserpostulant_cvNSS_key" UNIQUE ("cvNSS");


--
-- Name: ttApp_cvuserpostulant_cvRFC_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvuserpostulant"
    ADD CONSTRAINT "ttApp_cvuserpostulant_cvRFC_key" UNIQUE ("cvRFC");


--
-- Name: ttApp_cvuserpostulant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvuserpostulant"
    ADD CONSTRAINT "ttApp_cvuserpostulant_pkey" PRIMARY KEY ("cvUserPostulantId");


--
-- Name: ttApp_cvworkexperience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY public."ttApp_cvworkexperience"
    ADD CONSTRAINT "ttApp_cvworkexperience_pkey" PRIMARY KEY ("cvworkExpId");


--
-- Name: auth_group_name_342a9fc09fcd9f36_like; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_group_name_342a9fc09fcd9f36_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_0e939a4f; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_group_permissions_0e939a4f ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_8373b171; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_group_permissions_8373b171 ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_417f1b1c; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_permission_417f1b1c ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_0e939a4f; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_user_groups_0e939a4f ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_e8701ad4; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_user_groups_e8701ad4 ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_8373b171; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_user_user_permissions_8373b171 ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_e8701ad4; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_user_user_permissions_e8701ad4 ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_12ac51fc22eca584_like; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_user_username_12ac51fc22eca584_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: django_admin_log_417f1b1c; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_admin_log_417f1b1c ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_e8701ad4; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_admin_log_e8701ad4 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_de54fa62; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_session_de54fa62 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_78004b095558ff19_like; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_session_session_key_78004b095558ff19_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: ttApp_cvabilities_75ff556a; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvabilities_75ff556a" ON public."ttApp_cvabilities" USING btree ("cvCVId");


--
-- Name: ttApp_cvacademicexperience_75ff556a; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvacademicexperience_75ff556a" ON public."ttApp_cvacademicexperience" USING btree ("cvCVId");


--
-- Name: ttApp_cvadminuser_2a495e68; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvadminuser_2a495e68" ON public."ttApp_cvadminuser" USING btree ("cvUserId");


--
-- Name: ttApp_cvadminuser_7b731e3d; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvadminuser_7b731e3d" ON public."ttApp_cvadminuser" USING btree ("cvCompanyId");


--
-- Name: ttApp_cvcurriculumvitae_a1361e6b; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvcurriculumvitae_a1361e6b" ON public."ttApp_cvcurriculumvitae" USING btree ("cvUserPostulantId");


--
-- Name: ttApp_cvjoboffers_7b731e3d; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvjoboffers_7b731e3d" ON public."ttApp_cvjoboffers" USING btree ("cvCompanyId");


--
-- Name: ttApp_cvjoboffers_93ea2682; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvjoboffers_93ea2682" ON public."ttApp_cvjoboffers" USING btree ("cvUserAdminId");


--
-- Name: ttApp_cvlanguages_75ff556a; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvlanguages_75ff556a" ON public."ttApp_cvlanguages" USING btree ("cvCVId");


--
-- Name: ttApp_cvtools_75ff556a; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvtools_75ff556a" ON public."ttApp_cvtools" USING btree ("cvCVId");


--
-- Name: ttApp_cvuser_cvUserAccess_2f3343c2fc8fc475_like; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvuser_cvUserAccess_2f3343c2fc8fc475_like" ON public."ttApp_cvuser" USING btree ("cvUserAccess" varchar_pattern_ops);


--
-- Name: ttApp_cvuserpostulant_2a495e68; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvuserpostulant_2a495e68" ON public."ttApp_cvuserpostulant" USING btree ("cvUserId");


--
-- Name: ttApp_cvuserpostulant_cvCURP_2b5d31436b018d81_like; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvuserpostulant_cvCURP_2b5d31436b018d81_like" ON public."ttApp_cvuserpostulant" USING btree ("cvCURP" varchar_pattern_ops);


--
-- Name: ttApp_cvuserpostulant_cvNSS_1a7160606116802c_like; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvuserpostulant_cvNSS_1a7160606116802c_like" ON public."ttApp_cvuserpostulant" USING btree ("cvNSS" varchar_pattern_ops);


--
-- Name: ttApp_cvuserpostulant_cvRFC_1080f8093f5b51a5_like; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvuserpostulant_cvRFC_1080f8093f5b51a5_like" ON public."ttApp_cvuserpostulant" USING btree ("cvRFC" varchar_pattern_ops);


--
-- Name: ttApp_cvworkexperience_75ff556a; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "ttApp_cvworkexperience_75ff556a" ON public."ttApp_cvworkexperience" USING btree ("cvCVId");


--
-- Name: D0378845cb48f62f563dff34f867f240; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvjoboffers"
    ADD CONSTRAINT "D0378845cb48f62f563dff34f867f240" FOREIGN KEY ("cvUserAdminId") REFERENCES public."ttApp_cvadminuser"("cvUserAdminId") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: D42ba75a5fdddedc5aee328426940c29; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvcurriculumvitae"
    ADD CONSTRAINT "D42ba75a5fdddedc5aee328426940c29" FOREIGN KEY ("cvUserPostulantId") REFERENCES public."ttApp_cvuserpostulant"("cvUserPostulantId") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_content_type_id_15224c7e1e4018b0_fk_django_content_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_content_type_id_15224c7e1e4018b0_fk_django_content_type_id FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissio_group_id_763eb330f9a21fb8_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_group_id_763eb330f9a21fb8_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permission_id_7db2b4e11f50cf3b_fk_auth_permission_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permission_id_7db2b4e11f50cf3b_fk_auth_permission_id FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user__permission_id_52299078133342f1_fk_auth_permission_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user__permission_id_52299078133342f1_fk_auth_permission_id FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups_group_id_75cf033d426645aa_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_75cf033d426645aa_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups_user_id_27d7651b487dc5f3_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_27d7651b487dc5f3_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permiss_user_id_4eb45cbf2ee0b441_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permiss_user_id_4eb45cbf2ee0b441_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: djang_content_type_id_86da7959343f513_fk_django_content_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT djang_content_type_id_86da7959343f513_fk_django_content_type_id FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log_user_id_1c3073b92061e1d5_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_1c3073b92061e1d5_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: ttA_cvCompanyId_1338875bffb1aa36_fk_ttApp_cvcompany_cvCompanyId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvjoboffers"
    ADD CONSTRAINT "ttA_cvCompanyId_1338875bffb1aa36_fk_ttApp_cvcompany_cvCompanyId" FOREIGN KEY ("cvCompanyId") REFERENCES public."ttApp_cvcompany"("cvCompanyId") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: ttA_cvCompanyId_1e18c4df9e77857e_fk_ttApp_cvcompany_cvCompanyId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvadminuser"
    ADD CONSTRAINT "ttA_cvCompanyId_1e18c4df9e77857e_fk_ttApp_cvcompany_cvCompanyId" FOREIGN KEY ("cvCompanyId") REFERENCES public."ttApp_cvcompany"("cvCompanyId") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: ttApp__cvCVId_1b0b2ae85030380_fk_ttApp_cvcurriculumvitae_cvCVId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvlanguages"
    ADD CONSTRAINT "ttApp__cvCVId_1b0b2ae85030380_fk_ttApp_cvcurriculumvitae_cvCVId" FOREIGN KEY ("cvCVId") REFERENCES public."ttApp_cvcurriculumvitae"("cvCVId") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: ttApp_c_cvCVId_aeae7055da4903_fk_ttApp_cvcurriculumvitae_cvCVId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvacademicexperience"
    ADD CONSTRAINT "ttApp_c_cvCVId_aeae7055da4903_fk_ttApp_cvcurriculumvitae_cvCVId" FOREIGN KEY ("cvCVId") REFERENCES public."ttApp_cvcurriculumvitae"("cvCVId") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: ttApp_cvCVId_36b62f9495a2a31b_fk_ttApp_cvcurriculumvitae_cvCVId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvtools"
    ADD CONSTRAINT "ttApp_cvCVId_36b62f9495a2a31b_fk_ttApp_cvcurriculumvitae_cvCVId" FOREIGN KEY ("cvCVId") REFERENCES public."ttApp_cvcurriculumvitae"("cvCVId") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: ttApp_cvCVId_5c69d361f6da8a12_fk_ttApp_cvcurriculumvitae_cvCVId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvabilities"
    ADD CONSTRAINT "ttApp_cvCVId_5c69d361f6da8a12_fk_ttApp_cvcurriculumvitae_cvCVId" FOREIGN KEY ("cvCVId") REFERENCES public."ttApp_cvcurriculumvitae"("cvCVId") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: ttApp_cvCVId_5ca4632da86a1734_fk_ttApp_cvcurriculumvitae_cvCVId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvworkexperience"
    ADD CONSTRAINT "ttApp_cvCVId_5ca4632da86a1734_fk_ttApp_cvcurriculumvitae_cvCVId" FOREIGN KEY ("cvCVId") REFERENCES public."ttApp_cvcurriculumvitae"("cvCVId") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: ttApp_cvadmi_cvUserId_7b1b5c7037ba269c_fk_ttApp_cvuser_cvUserId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvadminuser"
    ADD CONSTRAINT "ttApp_cvadmi_cvUserId_7b1b5c7037ba269c_fk_ttApp_cvuser_cvUserId" FOREIGN KEY ("cvUserId") REFERENCES public."ttApp_cvuser"("cvUserId") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: ttApp_cvuser_cvUserId_5812a4ec12298c41_fk_ttApp_cvuser_cvUserId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ttApp_cvuserpostulant"
    ADD CONSTRAINT "ttApp_cvuser_cvUserId_5812a4ec12298c41_fk_ttApp_cvuser_cvUserId" FOREIGN KEY ("cvUserId") REFERENCES public."ttApp_cvuser"("cvUserId") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

