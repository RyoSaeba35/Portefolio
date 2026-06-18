# frozen_string_literal: true

# A portfolio project, backed by config/projects.yml.
# Adding a new project means editing that one file — no view changes.
class Project
  include ActiveModel::Model

  STAGES = %w[Recherche Wireframing Design Development Testing].freeze

  attr_accessor :id, :title, :subtitle, :link, :link_label, :github,:color,
                :description, :technologies, :cover_image, :gallery
  attr_writer :completed_stages, :gallery_label

  DATA_FILE = Rails.root.join("config", "projects.yml")

  class << self
    def all
      @all ||= YAML.load_file(DATA_FILE).map { |attrs| new(attrs) }
    end

    def find(id)
      all.find { |project| project.id == id.to_i }
    end
  end

  # Defaults to "every stage done" unless a project explicitly lists
  # which stages are complete (see Flashcard Wars in projects.yml).
  def completed_stages
    @completed_stages.presence || STAGES
  end

  def stage_completed?(stage)
    completed_stages.include?(stage)
  end

  # Defaults to "Gallerie" — Flashcard Wars overrides this to "Gallery"
  # in projects.yml, matching the original (slightly inconsistent) copy.
  def gallery_label
    @gallery_label.presence || "Gallerie"
  end

  # The YAML descriptions intentionally contain <strong> tags written
  # by you, not user input — safe to mark as html_safe for rendering.
  def description_paragraphs
    Array(description).map(&:html_safe)
  end
end
