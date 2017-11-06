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

ActiveRecord::Schema.define(version: 20171101193946) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "achievements", force: :cascade do |t|
    t.string   "title",            default: "",        null: false
    t.string   "icon",             default: "fa-bolt", null: false
    t.boolean  "show_icon",        default: true
    t.integer  "resume_id"
    t.string   "description",      default: "",        null: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.boolean  "show_title",       default: true
    t.boolean  "show_description", default: true
    t.integer  "item_index"
  end

  create_table "addresses", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "street_1",     limit: 255
    t.string   "street_2",     limit: 255
    t.string   "city",         limit: 255
    t.string   "state",        limit: 255
    t.string   "zip",          limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "practice_id"
    t.string   "add_type",     limit: 255
    t.string   "phone_number", limit: 255
  end

  create_table "awards", force: :cascade do |t|
    t.string   "name",             default: "",          null: false
    t.integer  "resume_id"
    t.string   "icon",             default: "fa-trophy"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.text     "description"
    t.boolean  "show_icon",        default: true
    t.boolean  "show_description", default: true
    t.integer  "item_index"
  end

  create_table "batches", force: :cascade do |t|
    t.integer  "practice_id"
    t.integer  "external_batch_id"
    t.integer  "format_id"
    t.string   "format_name",       limit: 255
    t.string   "status",            limit: 255, default: "uploaded"
    t.string   "file_path",         limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "file",              limit: 255
    t.datetime "approved_at"
    t.datetime "deleted_at"
    t.integer  "statement_count",               default: 0
    t.text     "xml_output"
  end

  create_table "cards", force: :cascade do |t|
    t.string   "card_name",   limit: 255
    t.string   "expiry_date", limit: 255
    t.integer  "cvv"
    t.string   "token",       limit: 255
    t.integer  "card_no"
    t.string   "card_type",   limit: 255
    t.string   "card_id",     limit: 255
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_primary",              default: false
  end

  create_table "certificates", force: :cascade do |t|
    t.string   "name",              default: "",   null: false
    t.string   "institutiion_name", default: "",   null: false
    t.integer  "resume_id"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.boolean  "show_institutiion", default: true
    t.integer  "item_index"
    t.string   "duration",          default: ""
    t.boolean  "show_period",       default: true
  end

  create_table "communications", force: :cascade do |t|
    t.integer  "statement_id"
    t.integer  "patient_id"
    t.string   "note",         limit: 255
    t.string   "comm_type",    limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "courses", force: :cascade do |t|
    t.string   "title",            default: "",   null: false
    t.integer  "resume_id"
    t.string   "description",      default: "",   null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.boolean  "show_description", default: true
    t.integer  "item_index"
  end

  create_table "educations", force: :cascade do |t|
    t.string   "degree_name",     default: "",    null: false
    t.string   "university_name", default: "",    null: false
    t.integer  "resume_id"
    t.string   "duration",        default: "",    null: false
    t.boolean  "ongoing",         default: false
    t.string   "cgpa"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.boolean  "show_location",   default: true
    t.boolean  "show_period",     default: true
    t.string   "location"
    t.boolean  "show_gpa",        default: true
    t.integer  "item_index"
  end

  create_table "experiences", force: :cascade do |t|
    t.string   "title",            default: "",    null: false
    t.string   "company_name",     default: "",    null: false
    t.string   "location",         default: "",    null: false
    t.integer  "resume_id"
    t.string   "duration",         default: "",    null: false
    t.text     "outcomes"
    t.string   "description",      default: "",    null: false
    t.boolean  "ongoing",          default: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.boolean  "show_location",    default: true
    t.boolean  "show_period",      default: true
    t.boolean  "show_outcomes",    default: true
    t.boolean  "show_description", default: true
    t.integer  "item_index"
  end

  create_table "headers", force: :cascade do |t|
    t.string   "name",                default: "",   null: false
    t.string   "job_title",           default: "",   null: false
    t.string   "phone",               default: "",   null: false
    t.string   "email",               default: "",   null: false
    t.string   "location",            default: "",   null: false
    t.string   "website_link",        default: "",   null: false
    t.boolean  "show_name",           default: true
    t.boolean  "show_location",       default: true
    t.boolean  "show_job_title",      default: true
    t.boolean  "show_phone",          default: true
    t.boolean  "show_email",          default: true
    t.boolean  "show_avatar",         default: true
    t.integer  "resume_id"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.boolean  "show_website_link",   default: true
  end

  create_table "languages", force: :cascade do |t|
    t.string   "name",             default: "",   null: false
    t.string   "level",            default: "40"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "resume_id"
    t.boolean  "show_proficiency", default: true
    t.integer  "item_index"
  end

  create_table "layouts", force: :cascade do |t|
    t.integer  "layout_type",   default: 1
    t.text     "section_names"
    t.text     "section_data"
    t.integer  "resume_id"
    t.integer  "user_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.boolean  "underline",     default: true
  end

  create_table "line_items", force: :cascade do |t|
    t.integer  "statement_id"
    t.integer  "service_id"
    t.date     "service_date"
    t.date     "first_bill_date"
    t.text     "description"
    t.float    "service_charge_amount",       default: 0.0
    t.float    "medicare_receipt_amount",     default: 0.0
    t.float    "insurance_receipt_amount",    default: 0.0
    t.float    "patient_receipt_amount",      default: 0.0
    t.float    "adjustment_amount",           default: 0.0
    t.float    "balance_amount",              default: 0.0
    t.boolean  "insurance_pending"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "patient_paid",                default: 0.0
    t.integer  "external_line_item_id"
    t.boolean  "is_duplicate"
    t.datetime "paid_date"
    t.float    "statpay_patient_paid",        default: 0.0
    t.integer  "line_item_type"
    t.float    "li_discount_payment_applied", default: 0.0
    t.integer  "line_item_indexes"
  end

  create_table "passions", force: :cascade do |t|
    t.string   "name",             default: "",         null: false
    t.integer  "resume_id"
    t.string   "description"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.boolean  "show_icon",        default: true
    t.boolean  "show_description", default: true
    t.integer  "item_index"
    t.string   "icon",             default: "fa-heart"
  end

  create_table "patients", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "guarantor_id"
    t.integer  "kareo_patient_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "patient_name",        limit: 255
    t.string   "patient_address",     limit: 255
    t.string   "guarantor_name",      limit: 255
    t.string   "guarantor_address",   limit: 255
    t.integer  "practice_id"
    t.string   "patient_street_1",    limit: 255
    t.string   "patient_street_2",    limit: 255
    t.string   "patient_city",        limit: 255
    t.string   "patient_state",       limit: 255
    t.string   "patient_zip",         limit: 255
    t.string   "gurantor_street_1",   limit: 255
    t.string   "gurantor_street_2",   limit: 255
    t.string   "gurantor_city",       limit: 255
    t.string   "gurantor_state",      limit: 255
    t.string   "gurantor_zip",        limit: 255
    t.string   "patient_first_name",  limit: 255
    t.string   "patient_last_name",   limit: 255
    t.string   "gurantor_first_name", limit: 255
    t.string   "gurantor_last_name",  limit: 255
    t.string   "relationship",        limit: 255
    t.string   "patient_middle_name", limit: 255
    t.string   "patient_prefix",      limit: 255
    t.string   "patient_suffix",      limit: 255
  end

  create_table "practice_patients", force: :cascade do |t|
    t.integer  "practice_id"
    t.integer  "patient_id"
    t.integer  "external_kareo_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "practice_users", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "practice_id"
    t.integer  "roles_mask"
    t.integer  "crud_mask"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "practices", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name",                       limit: 255
    t.string   "office_hours",               limit: 255
    t.string   "tax_id",                     limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "practice_management_system", limit: 255, default: "kareo", null: false
    t.string   "phone_no",                   limit: 255
    t.boolean  "visa_accepted",                          default: false
    t.boolean  "master_cartd_accepted",                  default: false
    t.boolean  "discover_accepted",                      default: false
    t.boolean  "amex_accepted",                          default: false
    t.string   "discount_type",              limit: 255
    t.date     "discount_due_date"
    t.string   "discount_due_days",          limit: 255
    t.string   "balance_due_days",           limit: 255
    t.boolean  "overdue_notification"
    t.float    "discount",                               default: 0.0
  end

  create_table "projects", force: :cascade do |t|
    t.string   "name",             default: "",    null: false
    t.string   "location",         default: "",    null: false
    t.integer  "resume_id"
    t.text     "outcomes"
    t.boolean  "show_outcomes",    default: true
    t.string   "duration",         default: "",    null: false
    t.string   "description",      default: "",    null: false
    t.boolean  "ongoing",          default: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.boolean  "show_location",    default: true
    t.boolean  "show_period",      default: true
    t.string   "link"
    t.boolean  "show_description", default: true
    t.boolean  "show_link",        default: true
    t.integer  "item_index"
  end

  create_table "quotes", force: :cascade do |t|
    t.string   "name",        default: "",   null: false
    t.integer  "resume_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "author"
    t.boolean  "show_author", default: true
    t.integer  "item_index"
  end

  create_table "resume_styles", force: :cascade do |t|
    t.string   "background_img"
    t.text     "available_background_images"
    t.string   "primary_color",               default: "black"
    t.string   "secondary_color",             default: "#00a7dd"
    t.text     "available_primary_colors"
    t.text     "available_secondary_colors"
    t.string   "primary_font"
    t.string   "secondary_font"
    t.string   "font_size"
    t.text     "available_primary_fonts"
    t.text     "available_secondary_fonts"
    t.text     "available_font_sizes"
    t.integer  "resume_id"
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

  create_table "resumes", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "pages",      default: 1
  end

  create_table "skills", force: :cascade do |t|
    t.string   "name",       default: "",   null: false
    t.string   "level",      default: "40"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "resume_id"
    t.boolean  "show_level", default: true
    t.integer  "item_index"
  end

  create_table "statements", force: :cascade do |t|
    t.integer  "batch_id"
    t.integer  "practice_id"
    t.integer  "patient_id"
    t.integer  "external_statement_id"
    t.integer  "external_statement_number"
    t.date     "statement_date"
    t.string   "comment",                                     limit: 255
    t.string   "patient_statement_type",                      limit: 255
    t.float    "last_payment_amount"
    t.float    "current_balance"
    t.float    "thirty_day_balance"
    t.float    "sixty_day_balance"
    t.float    "ninety_day_balance"
    t.float    "onehundredtwenty_day_balance"
    t.float    "total_balance"
    t.float    "insurance_pending_amount"
    t.float    "balance_due_amount"
    t.string   "payment_due_date",                            limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "deleted_at"
    t.float    "line_item_total_balance_amount",                          default: 0.0
    t.float    "line_item_total_service_charge_amount",                   default: 0.0
    t.float    "line_item_total_medicare_receipt_amount",                 default: 0.0
    t.float    "line_item_total_insurance_receipt_amount",                default: 0.0
    t.float    "line_item_total_adjustment_amount",                       default: 0.0
    t.string   "status",                                      limit: 255
    t.float    "line_item_total_receipt_amount",                          default: 0.0
    t.float    "line_item_total_patient_paid_amount",                     default: 0.0
    t.float    "line_item_total_statpay_patient_paid_amount",             default: 0.0
    t.float    "discount_payment_applied",                                default: 0.0
  end

  create_table "strengths", force: :cascade do |t|
    t.string   "title",            default: "",        null: false
    t.string   "item_icon"
    t.integer  "resume_id"
    t.string   "description",      default: "",        null: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.boolean  "show_icon",        default: true
    t.boolean  "show_description", default: true
    t.integer  "item_index"
    t.string   "icon",             default: "fa-star"
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
    t.string   "name",             default: "",   null: false
    t.text     "tec_names",        default: [],                array: true
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "resume_id"
    t.boolean  "show_gouup_title", default: true
    t.integer  "item_index"
  end

  create_table "transactions", force: :cascade do |t|
    t.integer  "statement_id"
    t.string   "card_name",         limit: 255
    t.string   "request",           limit: 255
    t.string   "response",          limit: 255
    t.string   "status",            limit: 255, default: "pending"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "amount"
    t.float    "remaining_balance"
    t.string   "payment_type",      limit: 255
    t.string   "payment_by",        limit: 255
    t.string   "paid_by",           limit: 255
    t.string   "card_last_digits",  limit: 255
    t.float    "discounted_amount",             default: 0.0
    t.string   "discount_type",     limit: 255
  end

  add_index "transactions", ["statement_id"], name: "index_transactions_on_statement_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "user_name"
    t.string   "user_type",              default: "guest", null: false
    t.string   "email",                  default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "volunteers", force: :cascade do |t|
    t.string   "title",             default: "",    null: false
    t.string   "organization_name", default: "",    null: false
    t.integer  "resume_id"
    t.string   "duration",          default: "",    null: false
    t.string   "description",       default: "",    null: false
    t.boolean  "ongoing",           default: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.boolean  "show_location",     default: true
    t.boolean  "show_period",       default: true
    t.string   "location"
    t.boolean  "show_description",  default: true
    t.integer  "item_index"
  end

  create_table "write_off_reasons", force: :cascade do |t|
    t.boolean  "billing_error"
    t.boolean  "write_off_balance"
    t.boolean  "other"
    t.string   "other_reason",          limit: 255
    t.integer  "statement_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "amount_transaction_id"
  end

  add_index "write_off_reasons", ["amount_transaction_id"], name: "index_write_off_reasons_on_amount_transaction_id", using: :btree

end
