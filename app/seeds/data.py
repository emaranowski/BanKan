import datetime

users = [
  {
    'id': 1,
    'first_name': 'Demo',
    'last_name': 'Demo',
    'username': 'Demo',
    'email': 'demo@aa.io',
    'password': 'password',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 2,
    'first_name': 'Marnie',
    'last_name': 'Smith',
    'username': 'marnie',
    'email': 'marnie@aa.io',
    'password': 'password',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 2,
    'first_name': 'Bobbie',
    'last_name': 'Smith',
    'username': 'bobbie',
    'email': 'bobbie@aa.io',
    'password': 'password',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  }
]

preset_images = [
  {
    'id': 1,
    'url': 'https://images.unsplash.com/photo-1508614999368-9260051292e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 2,
    'url': 'https://images.unsplash.com/photo-1635776062043-223faf322554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 3,
    'url': 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 4,
    'url': 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 5,
    'url': 'https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 6,
    'url': 'https://images.unsplash.com/photo-1621799754526-a0d52c49fad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 7,
    'url': 'https://images.unsplash.com/photo-1546448396-6aef80193ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2942&q=80',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 8,
    'url': 'https://images.unsplash.com/photo-1604340083878-a3947d1775c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 9,
    'url': 'https://images.unsplash.com/photo-1528731708534-816fe59f90cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 10,
    'url': 'https://images.unsplash.com/photo-1595404603599-2ad07f19556d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  }
]

boards = [
  {
    'id': 1,
    'user_id': 1,
    'image_url': 'https://images.unsplash.com/photo-1508614999368-9260051292e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'title': 'Build Website',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 2,
    'user_id': 1,
    'image_url': 'https://images.unsplash.com/photo-1635776062043-223faf322554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
    'title': 'Write Presentation',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 3,
    'user_id': 1,
    'image_url': 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'title': 'Revamp Database',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  }
]

preset_colors = [
  {
    'id': 1,
    'hex': '#a11800',
    'name': 'red',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 2,
    'hex': '#a15600',
    'name': 'orange',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 3,
    'hex': '#b08307',
    'name': 'yellow',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 4,
    'hex': '#3a8501',
    'name': 'green',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 5,
    'hex': '#016285',
    'name': 'blue',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 6,
    'hex': '#450185',
    'name': 'purple',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 7,
    'hex': '#cecece',
    'name': 'lightgray',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 8,
    'hex': '#8f8f8f',
    'name': 'medgray',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 9,
    'hex': '#686868',
    'name': 'darkgrey',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 10,
    'hex': '#000000',
    'name': 'black',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  }
]

columns = [
  {
    'id': 1,
    'board_id': 1,
    'card_order': 'card-1,card-2,card-3,card-4',
    # 'color_hex': '#a11800',
    'color_name': 'red',
    'title': 'Create documentation',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 2,
    'board_id': 1,
    'card_order': '',
    # 'color_hex': '#a15600',
    'color_name': 'orange',
    'title': 'Test local + live deployment',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 3,
    'board_id': 1,
    'card_order': '',
    # 'color_hex': '#b08307',
    'color_name': 'yellow',
    'title': 'Make models + seeds',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 4,
    'board_id': 2,
    'card_order': 'card-5,card-6',
    # 'color_hex': '#3a8501',
    'color_name': 'green',
    'title': 'Process data',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 5,
    'board_id': 2,
    'card_order': 'card-7,card-8,card-9',
    # 'color_hex': '#016285',
    'color_name': 'blue',
    'title': 'Draft slides',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 6,
    'board_id': 2,
    'card_order': 'card-10,card-11',
    # 'color_hex': '#450185',
    'color_name': 'purple',
    'title': 'Practice presenting',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 7,
    'board_id': 3,
    'card_order': 'card-12',
    # 'color_hex': '#cecece',
    'color_name': 'lightgray',
    'title': 'Review client feedback',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 8,
    'board_id': 3,
    'card_order': 'card-13',
    # 'color_hex': '#8f8f8f',
    'color_name': 'medgray',
    'title': 'Propose changes',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 9,
    'board_id': 3,
    'card_order': 'card-14,card-15',
    # 'color_hex': '#686868',
    'color_name': 'darkgray',
    'title': 'Draft tech specs',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  }
]

cards = [
  {
    'id': 1,
    'column_id': 1,
    'index': 0,
    'title': 'User stories',
    'description': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 2,
    'column_id': 1,
    'index': 1,
    'title': 'DB schema diagram',
    'description': 'Ideally use dbdiagram.io',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 3,
    'column_id': 1,
    'index': 2,
    'title': 'Endpoints',
    'description': 'May need to add/update later',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 4,
    'column_id': 1,
    'index': 3,
    'title': 'Wireframes',
    'description': 'Probably use drawIO (app.diagrams.net), but maybe Figma?',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 5,
    'column_id': 4,
    'index': 0,
    'title': 'Run frequencies',
    'description': 'Look at city, zip code, and county',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 6,
    'column_id': 4,
    'index': 1,
    'title': 'Make tables',
    'description': 'For city + zip code. County also?',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 7,
    'column_id': 5,
    'index': 0,
    'title': 'Draft slide text',
    'description': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 8,
    'column_id': 5,
    'index': 1,
    'title': 'Format tables for slides',
    'description': 'For city + zip code. County also?',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 9,
    'column_id': 5,
    'index': 2,
    'title': 'Add images',
    'description': 'For city + zip code. County also?',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 10,
    'column_id': 6,
    'index': 0,
    'title': 'Run thru timing solo',
    'description': 'Aim for 4-5 min',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 11,
    'column_id': 6,
    'index': 1,
    'title': 'Time with a coworker',
    'description': 'Bribe Ted with coffee',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 12,
    'column_id': 7,
    'index': 0,
    'title': 'Compile survey themes',
    'description': 'Group into ~15 themes max',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 13,
    'column_id': 8,
    'index': 0,
    'title': 'Propose 3-5 new fields',
    'description': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 14,
    'column_id': 9,
    'index': 0,
    'title': 'Draft specs',
    'description': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 15,
    'column_id': 9,
    'index': 1,
    'title': 'Clear specs w/ DB people',
    'description': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  }
]

notebooks = [
  {
    'id': 1,
    'user_id': 1,
    'image_url': 'https://images.unsplash.com/photo-1646038572811-c951135b947c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'title': 'Houseplant website',
    'note_order': 'note-1,note-2,note-3,note-4,note-5,note-6',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 2,
    'user_id': 1,
    'image_url': 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    'title': 'ShouldReads/GoodReads clone',
    'note_order': 'note-7,note-8,note-9,note-10,note-11,note-12',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 3,
    'user_id': 1,
    'image_url': 'https://images.unsplash.com/photo-1604339454148-1c23f0b5d156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2160&q=80',
    'title': 'Coding resources',
    'note_order': 'note-13,note-14,note-15',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  }
]

notes = [
  {
    'id': 1,
    'notebook_id': 1,
    'color_name': 'green',
    'title': 'Use real plant API',
    'text': 'Look for good plant API',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 2,
    'notebook_id': 1,
    'color_name': 'green',
    'title': 'Feature: Account',
    'text': 'Properties: zip code, growing region, humidity',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 3,
    'notebook_id': 1,
    'color_name': 'green',
    'title': 'Feature: Room',
    'text': 'Properties: lighting, windows, window direction (if windows), temperature',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 4,
    'notebook_id': 1,
    'color_name': 'green',
    'title': 'Feature: Wishlist',
    'text': 'Properties: plant name, description, size, water, light, notes',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 5,
    'notebook_id': 1,
    'color_name': 'green',
    'title': 'Feature: My current plants',
    'text': 'Properties: plant name, description, size, water, light, notes',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 6,
    'notebook_id': 1,
    'color_name': 'green',
    'title': 'Feature: My past plants',
    'text': 'Properties: plant name, description, size, water, light, notes',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 7,
    'notebook_id': 2,
    'color_name': 'lightgray',
    'title': 'Try real books API',
    'text': 'Maybe Google Books API? Or GoodReads API?',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 8,
    'notebook_id': 2,
    'color_name': 'lightgray',
    'title': 'Feature: Want to Read',
    'text': 'Properties: books',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 9,
    'notebook_id': 2,
    'color_name': 'lightgray',
    'title': 'Feature: Have Read',
    'text': 'Properties: books',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 10,
    'notebook_id': 2,
    'color_name': 'lightgray',
    'title': 'Feature: Book',
    'text': 'Properties: book title, description, genre, pages',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 11,
    'notebook_id': 2,
    'color_name': 'lightgray',
    'title': 'Feature: Account Profile',
    'text': 'Properties: favorite genres, favorite books, username, about',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 12,
    'notebook_id': 2,
    'color_name': 'lightgray',
    'title': 'Feature: Groups',
    'text': 'Properties: members, genres, authors',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 13,
    'notebook_id': 3,
    'color_name': 'orange',
    'title': 'Leetcode',
    'text': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 14,
    'notebook_id': 3,
    'color_name': 'orange',
    'title': 'Structy',
    'text': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 15,
    'notebook_id': 3,
    'color_name': 'orange',
    'title': 'a/A Docker Materials',
    'text': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  }
]
