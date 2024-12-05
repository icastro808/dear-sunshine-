/* eslint-disable max-len */

'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Letter } from '@prisma/client';
import { EditLetterSchema } from '@/lib/validationSchemas';
import { editLetter } from '@/lib/dbActions';

const onSubmit = async (data: Letter) => {
  await editLetter(data);
  swal('Success', 'Your letter has been updated', 'success', {
    timer: 2000,
  });
};

const tagOptions: ('vent' | 'advice' | 'thoughts' | 'positivity' | 'love' | 'family' | 'friendship' | 'school')[] = ['vent', 'advice', 'thoughts', 'positivity', 'love', 'family', 'friendship', 'school'];

const EditLetterForm = ({ letter }: { letter: Letter }) => {
  const [selectedTags, setSelectedTags] = useState<('vent' | 'advice' | 'thoughts' | 'positivity' | 'love' | 'family' | 'friendship' | 'school')[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Letter>({
    resolver: yupResolver(EditLetterSchema),
  });

  useEffect(() => {
    if (letter.tags) {
      setSelectedTags(letter.tags); // Assuming letter.tags is an array of strings
      setValue('tags', letter.tags); // Set the tags in the form state
    }
  }, [letter, setValue]);

  const handleTags = (tag: 'vent' | 'advice' | 'thoughts' | 'positivity' | 'love' | 'family' | 'friendship' | 'school') => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    setValue('tags', updatedTags);
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Edit Letter</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={letter.id} />
                <Form.Group>
                  <Form.Label>Text</Form.Label>
                  <textarea
                    {...register('text')}
                    defaultValue={letter.text}
                    className={`form-control ${errors.text ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.text?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Tags</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {tagOptions.map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant={selectedTags.includes(tag) ? 'primary' : 'outline-primary'}
                        onClick={() => handleTags(tag)}
                        className="me-2 mb-2"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                  {errors.tags && <div className="invalid-feedback d-block">{errors.tags?.message}</div>}
                </Form.Group>

                <input type="hidden" {...register('owner')} value={letter.owner} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default EditLetterForm;
