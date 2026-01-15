<?php

return [
    'connection' => env('TENANT_DB_CONNECTION', 'mysql'),
    'databases' => [
        'dbsja',
        'dbbbbs',
        'dbstg',
        'dbarm',
        'dbati',
    ],
    'labels' => [
        'dbsja' => 'DB SJA',
        'dbbbbs' => 'DB BBBS',
        'dbstg' => 'DB STG',
        'dbarm' => 'DB ARM',
        'dbati' => 'DB ATI',
    ],
    'companies' => [
        'dbsja' => [
            'name' => 'CV. SEMESTA JAYA ABADI',
            'address' => 'Jl. Sentosa RT. 72 No. 36C, Samarinda',
            'phone' => '0541-771571',
            'email' => 'cs_sja@yahoo.com',
        ],
        'dbstg' => [
            'name' => 'CV. SURYA TEKNIK GEMILANG',
            'address' => 'Jl. Harmoni II (Lingkar Dalam Selatan) RT. 026/002, Pekapuran Raya, Banjarmasin Timur',
            'kota' => 'Kota Banjarmasin Provinsi Kalimantan Selatan',
            'phone' => '0511 - 6783217',
            'email' => '',
        ],
    ],
    'last_online_column' => 'LastOnline',
];
