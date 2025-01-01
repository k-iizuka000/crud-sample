-- データベーススキーマ定義
ALTER DATABASE crud_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 部署テーブル作成
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ユーザーテーブル作成
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department_id INT,
    hire_date DATE,
    position VARCHAR(50),
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- インデックス追加
CREATE INDEX idx_department_code ON departments(department_code);
CREATE INDEX idx_user_department ON users(department_id);
CREATE INDEX idx_user_status ON users(status);

-- サンプルデータ挿入（オプション）
-- 部署データ
INSERT INTO departments (department_code, name, description) VALUES 
('HR', '人事部', '人事管理を担当'),
('IT', '情報システム部', 'IT関連業務を担当'),
('SALES', '営業部', '営業活動を担当');

-- ユーザーデータ
INSERT INTO users (username, email, first_name, last_name, department_id, hire_date, position) VALUES 
('john.doe', 'john.doe@company.com', 'John', 'Doe', 1, '2022-01-15', '人事マネージャー'),
('jane.smith', 'jane.smith@company.com', 'Jane', 'Smith', 2, '2021-05-20', 'ITエンジニア'),
('mike.brown', 'mike.brown@company.com', 'Mike', 'Brown', 3, '2023-02-10', '営業担当');
