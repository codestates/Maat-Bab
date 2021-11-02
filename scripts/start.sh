#!/bin/bash
cd /home/ubuntu/Maat-Bab/server

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')
export PORT=$(aws ssm get-parameters --region ap-northeast-2 --names PORT --query Parameters[0].Value | sed 's/"//g')
export NODE_ENV=$(aws ssm get-parameters --region ap-northeast-2 --names NODE_ENV --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_DEVELOPMENT_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_DEVELOPMENT_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_DEVELOPMENT_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_DEVELOPMENT_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_DEVELOPMENT_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_DEVELOPMENT_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PRODUCTION_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PRODUCTION_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PRODUCTION_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PRODUCTION_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PRODUCTION_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PRODUCTION_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PRODUCTION_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PRODUCTION_PORT --query Parameters[0].Value | sed 's/"//g')
export KAKAO_clientID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_clientID --query Parameters[0].Value | sed 's/"//g')
export KAKAO_clientSecret=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_clientSecret --query Parameters[0].Value | sed 's/"//g')
export KAKAO_redirectUri=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_redirectUri --query Parameters[0].Value | sed 's/"//g')
export NODEMAILER_USER=$(aws ssm get-parameters --region ap-northeast-2 --names NODEMAILER_USER --query Parameters[0].Value | sed 's/"//g')
export NODEMAILER_PASS=$(aws ssm get-parameters --region ap-northeast-2 --names NODEMAILER_PASS --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js