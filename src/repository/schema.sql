IF NOT EXIST CREATE TABLE articles (
        id INTEGER PRIMARY KEY,
        author TEXT,
        title TEXT,
        journal TEXT,
        year INTEGER,
        volume TEXT,
        number TEXT,
        pages TEXT
    );