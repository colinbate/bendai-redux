# 
#  user.rb
#  bendai
#  
#  Created by Colin Bate on 2010-02-04.
#  Bendai Project
# 

require 'digest/sha2'

class User
  include MongoMapper::Document
  
  key :email, String, :required => true
  key :password, String, :required => true
  key :salt, String, :required => true
  key :session_id, String # TODO: Ensure this is unique somehow.
  key :session_start, String
  key :total_play, Float
  
  def set_password(pwd)
    self.salt = User.gen_salt;
    self.password = User.hash(pwd, self.salt)
  end
  
  def check_password(pwd)
    User.hash(pwd,self.salt) == self.password 
  end
  
  def to_hash()
    {'email' => self.email, 'session_id' => self.session_id, 'session_start' => self.session_start}
  end
  
  def self.hash(pwd, salt)
    Digest::SHA512.hexdigest("#{pwd}:#{salt}")
  end
  
  def self.gen_salt()
    salt = ""
    64.times { salt << (i = Kernel.rand(62); i += ((i < 10) ? 48 : ((i < 36) ? 55 : 61 ))).chr }
    salt
  end
end