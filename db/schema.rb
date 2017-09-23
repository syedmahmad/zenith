# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170923201519) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "achievements", force: :cascade do |t|
    t.string   "title",       default: "", null: false
    t.string   "item_icon"
    t.integer  "resume_id"
    t.string   "description", default: "", null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "awards", force: :cascade do |t|
    t.string   "name",       default: "", null: false
    t.integer  "resume_id"
    t.string   "icon"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "certificates", force: :cascade do |t|
    t.string   "name",              default: "", null: false
    t.string   "institutiion_name", default: "", null: false
    t.integer  "resume_id"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "courses", force: :cascade do |t|
    t.string   "title",       default: "", null: false
    t.integer  "resume_id"
    t.string   "description", default: "", null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "educations", force: :cascade do |t|
    t.string   "degree_name",     default: "", null: false
    t.string   "university_name", default: "", null: false
    t.integer  "resume_id"
    t.string   "duration",        default: "", null: false
    t.float    "cgpa"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  create_table "experiences", force: :cascade do |t|
    t.string   "title",        default: "", null: false
    t.string   "company_name", default: "", null: false
    t.string   "location",     default: "", null: false
    t.integer  "resume_id"
    t.string   "duration",     default: "", null: false
    t.string   "description",  default: "", null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "headers", force: :cascade do |t|
    t.string   "name",                default: "",   null: false
    t.string   "location",            default: "",   null: false
    t.string   "description",         default: "",   null: false
    t.string   "phone",               default: "",   null: false
    t.string   "email",               default: "",   null: false
    t.boolean  "show_name",           default: true
    t.boolean  "show_location",       default: true
    t.boolean  "show_description",    default: true
    t.boolean  "show_phone",          default: true
    t.boolean  "show_email",          default: true
    t.boolean  "show_photo",          default: true
    t.integer  "resume_id"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  create_table "languages", force: :cascade do |t|
    t.string   "name",       default: "", null: false
    t.string   "level",      default: "", null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "resume_id"
  end

  create_table "layouts", force: :cascade do |t|
    t.integer  "layout_type",  default: 1
    t.string   "section_name", default: "", null: false
    t.text     "section_data"
    t.integer  "user_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "resume_id"
  end

  create_table "passions", force: :cascade do |t|
    t.string   "name",       default: "", null: false
    t.integer  "resume_id"
    t.string   "icon"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "name",        default: "", null: false
    t.string   "location",    default: "", null: false
    t.integer  "resume_id"
    t.string   "duration",    default: "", null: false
    t.string   "description", default: "", null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "publications", force: :cascade do |t|
    t.string   "name",         default: "", null: false
    t.string   "authors_name", default: "", null: false
    t.integer  "resume_id"
    t.string   "date",         default: "", null: false
    t.string   "url"
    t.string   "description",  default: "", null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "quotes", force: :cascade do |t|
    t.string   "name",       default: "", null: false
    t.integer  "resume_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "resume_styles", force: :cascade do |t|
    t.string   "background"
    t.string   "fontbody"
    t.string   "fontheading"
    t.string   "color"
    t.integer  "resume_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "resumes", force: :cascade do |t|
    t.string   "name",        default: "", null: false
    t.string   "title",       default: "", null: false
    t.integer  "user_id"
    t.string   "description", default: "", null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "skills", force: :cascade do |t|
    t.string   "name",       default: "", null: false
    t.string   "level",      default: "", null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "resume_id"
  end

  create_table "strengths", force: :cascade do |t|
    t.string   "title",       default: "", null: false
    t.string   "item_icon"
    t.integer  "resume_id"
    t.string   "description", default: "", null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "summaries", force: :cascade do |t|
    t.string   "name",        default: "", null: false
    t.string   "title",       default: "", null: false
    t.integer  "resume_id"
    t.string   "description", default: "", null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "technologies", force: :cascade do |t|
    t.string   "name",       default: "", null: false
    t.text     "tec_names",  default: [],              array: true
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "resume_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "name",                   default: "", null: false
    t.string   "location",               default: "", null: false
    t.string   "description",            default: "", null: false
    t.string   "phone",                  default: "", null: false
    t.string   "contact_email",          default: "", null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "volunteers", force: :cascade do |t|
    t.string   "title",             default: "", null: false
    t.string   "organization_name", default: "", null: false
    t.integer  "resume_id"
    t.string   "duration",          default: "", null: false
    t.string   "description",       default: "", null: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

end
