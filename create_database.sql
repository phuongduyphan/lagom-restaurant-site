create schema `lagom-restaurant`;

use `lagom-restaurant`;

create table `user` (
	`user_id` int(11) not null auto_increment,
    `user_full_name` varchar(100) not null,
    `user_phone_number` varchar(15) not null, 
    `user_address` varchar(255),
    primary key (`user_id`)
);

create table `dish` (
	`dish_id` int(11) not null auto_increment,
	`dish_name` varchar(100) not null,
    `dish_description` varchar(255),
    `dish_image_path` varchar(255),
    `dish_status` enum('available', 'unavailable') not null default 'available',
    primary key (`dish_id`)
);

create table `order` (
	`order_id` int(11) not null auto_increment,
	`user_id` int(11) not null,
    `order_creation_time` datetime not null default current_timestamp,
    `order_status` enum('pending', 'confirmed', 'delivered') not null default 'pending',
    primary key (`order_id`),
    foreign key (`user_id`) 
		references `user` (`user_id`)
        on delete cascade
);

create table `order_contains` (
	`order_id` int(11) not null,
    `dish_id` int(11) not null,
    primary key (`order_id`, `dish_id`),
    foreign key (`order_id`)
		references `order` (`order_id`)
        on delete cascade,
	foreign key (`dish_id`) 
		references `dish` (`dish_id`)
		on delete cascade
);

create table `reservation` (
	`reservation_id` int(11) not null auto_increment,
	`user_id` int(11) not null,
    `arrival_date` date not null,
    `arrival_time` time not null,
    `party_size` int(11) not null,
    `status` enum('pending', 'confirmed', 'declined') not null default 'pending',
    primary key (`reservation_id`),
    foreign key (`user_id`)
		references `user` (`user_id`)
        on delete cascade
);