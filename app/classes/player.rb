# 
#  session.rb
#  bendai
#  
#  Created by Colin Bate on 2010-02-06.
#  Bendai Project
# 

class Player
  include MongoMapper::Document
  
  key :name, String, :required => true
  key :user, ObjectId
  key :max_hp, Integer, :required => true
  key :class, String
  
end