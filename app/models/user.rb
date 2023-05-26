# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string           not null
#  last_name       :string           not null
#  bio             :text
#


class User < ApplicationRecord
    has_secure_password

    validates :first_name, :last_name, presence: true
    validates :email, :session_token, presence: true, uniqueness: true
    validates :email, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { in: 6..255 }, allow_nil: true

    # ABSPIREG

    has_many :reviews,
        foreign_key: :user_id,
        class_name: :Review,
        dependent: :destroy

    attr_reader :password
    before_validation :ensure_session_token

    def self.find_by_credentials(credential, password)
        user = User.find_by(email: credential)
        if user && user.is_password?(password)
            user
        else
            nil
        end
    end

    # def self.find_by_credentials(username, password)
    #     user = User.find_by(username: username)
    #     if user && user.is_password?(password)
    #         user
    #     else
    #         nil
    #     end
    # end

    # def self.find_by_credentials(credential, password)
    #     field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    #     user = User.find_by(field => credential)
    #     user&.authenticate(password)
    # end

    def password=(password)
        self.password_digest = BCrypt::Password.create(password)
        @password = password
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    private

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def generate_unique_session_token
        session_token = SecureRandom.urlsafe_base64
        return session_token unless User.exists?(session_token: session_token)
    end
end
