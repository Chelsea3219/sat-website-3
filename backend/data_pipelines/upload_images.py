import cloudinary
import cloudinary.uploader
from io import BytesIO

# Configuration
from backend.core.config import settings

# Configure Cloudinary
cloudinary.config(
    cloud_name = settings.CLOUDINARY_CLOUD_NAME,
    api_key = settings.CLOUDINARY_API_KEY,
    api_secret = settings.CLOUDINARY_API_SECRET,
    secure = True
)


# Upload images to Cloudinary
def cloudinary_settings(image,section, topic, subtopic, folder, public_id):

    if image is None or image == "null":
        return None
    try:
        buffer = BytesIO()
        image.save(buffer, format='PNG')
        buffer.seek(0)
        result = cloudinary.uploader.upload(
            buffer,
            folder=f"sat_questions/{section}/{topic}/{subtopic}/{folder}",
            public_id=public_id,
            overwrite=True,
            resource_type='image',
        )
        return result.get('secure_url')
    except Exception as e:
        print(f"Error uploading image to cloudinary: {e}")
        return None


def upload_image_to_cloudinary(questions, section, topic, subtopic):
    question_num = 1
    for i in questions:
        # Upload images to Cloudinary (store URLs)
        question_preview_url = cloudinary_settings(
            i.get("question_preview"),
            folder="question_previews",
            public_id=f"Q {question_num}",
            section=section,
            topic=topic,
            subtopic=subtopic,
        )
        multiple_choice_preview_url = cloudinary_settings(
            i.get("multiple_choice_preview"),
            folder="multiple_choice_preview",
            public_id=f"Q {question_num}",
            section=section,
            topic=topic,
            subtopic=subtopic,
        )
        i['question_preview'] = question_preview_url
        i['multiple_choice_preview'] = multiple_choice_preview_url

        question_num += 1
    return questions