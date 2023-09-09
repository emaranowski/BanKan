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
    # 'color_hex': '#a11800',
    'color_name': 'red',
    'title': 'Create documentation',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 2,
    'board_id': 1,
    # 'color_hex': '#a15600',
    'color_name': 'orange',
    'title': 'Test local + live deployment',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 3,
    'board_id': 1,
    # 'color_hex': '#b08307',
    'color_name': 'yellow',
    'title': 'Make models + seeds',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 4,
    'board_id': 2,
    # 'color_hex': '#3a8501',
    'color_name': 'green',
    'title': 'Process data',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 5,
    'board_id': 2,
    # 'color_hex': '#016285',
    'color_name': 'blue',
    'title': 'Draft slides',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 6,
    'board_id': 2,
    # 'color_hex': '#450185',
    'color_name': 'purple',
    'title': 'Practice presenting',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 7,
    'board_id': 2,
    # 'color_hex': '#FFFFFF',
    'color_name': 'white',
    'title': 'Review client feedback',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 8,
    'board_id': 2,
    # 'color_hex': '#8f8f8f',
    'color_name': 'lightgray',
    'title': 'Propose changes',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 9,
    'board_id': 2,
    # 'color_hex': '#000000',
    'color_name': 'black',
    'title': 'Draft tech specs',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  }
]

cards = [
  {
    'id': 1,
    'column_id': 1,
    'title': 'User stories',
    'description': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 2,
    'column_id': 1,
    'title': 'DB schema diagram',
    'description': 'Ideally use dbdiagram.io',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 3,
    'column_id': 1,
    'title': 'Endpoints',
    'description': 'May need to add/update later',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 4,
    'column_id': 1,
    'title': 'Wireframes',
    'description': 'Probably use drawIO (app.diagrams.net), but maybe Figma?',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 5,
    'column_id': 4,
    'title': 'Run frequencies',
    'description': 'Look at city, zip code, and county',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 6,
    'column_id': 4,
    'title': 'Make tables',
    'description': 'For city + zip code. County also?',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 7,
    'column_id': 5,
    'title': 'Draft slide text',
    'description': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 8,
    'column_id': 5,
    'title': 'Format tables for slides',
    'description': 'For city + zip code. County also?',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 9,
    'column_id': 5,
    'title': 'Add images',
    'description': 'For city + zip code. County also?',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 10,
    'column_id': 6,
    'title': 'Run thru timing solo',
    'description': 'Aim for 4-5 min',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 11,
    'column_id': 6,
    'title': 'Time with a coworker',
    'description': 'Bribe Ted with coffee',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 12,
    'column_id': 7,
    'title': 'Compile survey themes',
    'description': 'Group into ~15 themes max',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 13,
    'column_id': 8,
    'title': 'Propose 3-5 new fields',
    'description': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 14,
    'column_id': 9,
    'title': 'Draft specs',
    'description': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  },
  {
    'id': 14,
    'column_id': 9,
    'title': 'Clear specs w/ DB people',
    'description': '',
    'created_at': datetime.datetime.now(),
    'updated_at': datetime.datetime.now()
  }
]
