import { NextResponse } from "next/server";
import { prisma } from '@/libs/prisma'

export async function GET(request,{params: {id}}) {
    try {
        const estudiante = await prisma.estudiante.findFirst({
            where: {
             id: Number(id)
            }
         })

         if(!estudiante){
            return NextResponse.json(
                {mensaje: 'El estudiante no existe'},
                {status: 404}
            )
         }

         return NextResponse.json(estudiante)
    } catch (error) {
        if(error instanceof Error)
            return NextResponse.json(error.message,{status: 500})
    }
}

export async function DELETE(request, { params: { id } }) {
    try {
      const existingStudent = await prisma.estudiante.findFirst({
        where: {
          id: Number(id),
        },
      });
  
      if (!existingStudent) {
        return NextResponse.json(
          { mensaje: "El estudiante no existe" },
          { status: 404 }
        );
      }
  
      await prisma.estudiante.delete({
        where: {
          id: Number(id),
        },
      });
  
      return NextResponse.json(
        { mensaje: "Estudiante eliminado con éxito" },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(error.message, { status: 500 });
      }
    }
  }
  

  export async function PUT(request, { params: { id }}) {
    try {
      const existingStudent = await prisma.estudiante.findFirst({
        where: {
          id: Number(id),
        },
      });
  
      if (!existingStudent) {
        return NextResponse.json(
          { mensaje: "El estudiante no existe" },
          { status: 404 }
        );
      }
  
      const {nombre,genero,edad,carrera} = await request.json()
        const actualizarEstudiante = await prisma.estudiante.update({
            where: {
                id: Number(id),
              },
            data:{
                nombre,
                genero,
                edad,
                carrera
            }
        })
  
      return NextResponse.json(actualizarEstudiante, { status: 200 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(error.message, { status: 500 });
      }
    }
  }
  
