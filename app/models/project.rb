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

  def completed_stages
    @completed_stages.presence || STAGES
  end

  def stage_completed?(stage)
    completed_stages.include?(stage)
  end

  def gallery_label
    @gallery_label.presence || "Gallerie"
  end

  # YAML contain <strong> tags written so html_safe for rendering.
  def description_paragraphs
    Array(description).map(&:html_safe)
  end
end
