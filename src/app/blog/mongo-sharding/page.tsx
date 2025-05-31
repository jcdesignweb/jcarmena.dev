"use client";

import "@/app/page.module.css";

import "@/app/Resonsive.css";
import Image from "next/image";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const iPostCodeString = `export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId | IUser;
  categories: (Types.ObjectId | ICategory)[];
  tags: string[];
  comments: Types.DocumentArray<IComment>;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}
`;

const commentCodeString = `export interface IComment {
  text: string;
  commenterName: string;
  commenterEmail: string;
  createdAt: Date;
}
`;

const adminShardString = `db.adminCommand({ shardCollection: "daily_db.posts", key: { _id: "hashed" } })`;

export default function Page() {
  return (
    <>
      <div id="mongo">
        <div className="content-header">
          <h1 className="content-title">Mongo - Sharding</h1>
          <p className="content-description">
            Tutorial centrado en una opcion para poder escalar una base de datos
            en MongoDB
          </p>
        </div>

        <div className="blog-post">
          <p>
            Antes de comenzar a hablar con teoria imaginemos que tenemos que
            desarrollar un sistema para un Periódico para el cual tenemos una
            Base de datos llamada <b>daily_db</b>.
          </p>
          <br />
          <p>
            En la cual existe una colección (tabla) llamada <b>posts</b> que
            contiene la siguiente estructura:
          </p>

          <div className="codes">
            <SyntaxHighlighter
              language={"typescript"}
              style={oneDark}
              showLineNumbers
            >
              {iPostCodeString}
            </SyntaxHighlighter>
          </div>

          <br />
          <p>
            Donde la propiedad <b>comments</b> es un array que contiene lo
            siguiente:
          </p>

          <div className="codes">
            <SyntaxHighlighter
              language={"typescript"}
              style={oneDark}
              showLineNumbers
            >
              {commentCodeString}
            </SyntaxHighlighter>
          </div>

          <br />

          <p>
            Hasta acá todo normal, tenemos una collection que contiene
            información de las noticias en la cual se "embeben" los comentarios
            del post alli mismo.
          </p>

          <br />
          <p>
            <b>
              <u>
                ¿Pero que pasaría si esa collección creciera abruptamente en 50
                millones documentos (registros)?
              </u>
            </b>{" "}
            <span style={{ fontSize: 30 }}>&#128561;</span>
          </p>

          <p>
            Dependiendo crucialmente de como hagamos las busquedas (además de
            los indices) podriamos estar teniendo problemas de delay para la
            busqueda de la información.
          </p>

          <p>
            Para solucionar esto, existe una ténica llamada <b>Sharding</b>.
          </p>

          <br />

          <h3>¿Qué es el Sharding en MongoDB?</h3>

          <p>
            El sharding es un método para distribuir grandes conjuntos de datos
            y la carga de operaciones de una base de datos entre múltiples
            servidores. En MongoDB, el sharding permite la escalabilidad
            horizontal, lo que significa que puedes añadir más servidores
            (llamados "shards") para manejar más datos y tráfico, en lugar de
            depender de un solo servidor más potente (escalabilidad vertical).
          </p>
          <p>
            Un clúster shardeado de MongoDB consta de tres componentes
            principales:
          </p>
          <ul>
            <li>
              <b>Shards:</b> Son los servidores de la base de datos que
              almacenan los datos reales. Cada shard es un conjunto de réplicas
              (replica set) para alta disponibilidad.
            </li>
            <li>
              <b>mongos:</b> Son los routers de consulta. Las aplicaciones
              cliente se conectan a un proceso mongos, no directamente a los
              shards.{" "}
              <b>
                <i>mongos</i>
              </b>{" "}
              sabe dónde residen los datos y enruta las consultas al shard o
              shards correctos.
            </li>
            <li>
              <b>Config Servers:</b> Almacenan los metadatos del clúster,
              incluyendo qué rangos de datos se almacenan en qué shard (el
              "mapa" del clúster). También deben ser un conjunto de réplicas.
            </li>
          </ul>
          <br />

          <Image
            src="/tutorial/mongo-sharding.svg"
            width={500}
            height={360}
            alt="mongo"
          />
          <br />
          <br />

          <h3>
            ¿Cómo podríamos aplicar esto en nuestra collection <b>posts</b>?
          </h3>

          <p>
            El paso más crítico al implementar sharding es elegir una{" "}
            <b>clave de shard (shard key)</b>. La clave de shard es un campo o
            un conjunto de campos en tus documentos que MongoDB utiliza para
            distribuir los datos entre los shards. Una buena clave de shard es
            esencial para un rendimiento óptimo y una distribución uniforme de
            la carga.
          </p>

          <p>
            Dada esta situación (<b>Posts</b> con millones de documentos y 50+
            comentarios embebidos), la clave de shard es crucial.
          </p>

          <br />

          <p>
            Consideraciones para la Clave de Shard en <code>Posts</code>
          </p>

          <p>Cuando eliges una clave de shard, buscas características como:</p>
          <br />
          <ul>
            <li>
              <b>Cardinalidad Alta:</b> Muchos valores únicos para la clave de
              shard.
            </li>
            <li>
              <b>Distribución Uniforme:</b> Los valores se distribuyen de manera
              que los datos no se concentren en uno o pocos shards (evitar
              "hotspots").
            </li>
            <li>
              <b>Frecuencia de Consultas:</b> Si tus consultas incluyen la clave
              de shard, <code>mongos</code> puede dirigir la consulta
              directamente al shard correcto (consultas dirigidas), evitando
              "scatter-gather" (consultas que van a todos los shards).
            </li>
          </ul>
          <br />
          <p>
            Dada que los documentos de <code>Posts</code> son grandes debido a
            los 50 comentarios embebidos, la estrategia de sharding debe
            centrarse en{" "}
            <b>
              distribuir estos documentos grandes de manera uniforme para las
              escrituras
            </b>{" "}
            y permitir <b>consultas eficientes.</b>
          </p>

          <br />
          <ul>
            <li>
              <b>Opción 1: </b><code>_id</code> <b>hasheado.</b>
            </li>
            <li style={{ listStyleType: "none" }}>
              <ul className="sub-list">
                <li>
                  Es la opción más sencilla y robusta para garantizar una
                  distribución uniforme de las escrituras y lecturas (si las
                  consultas no son predominantemente por rango).{" "}
                  <code>ObjectId</code>s tienen una alta cardinalidad.
                </li>
                <li>
                  <code>{adminShardString}</code>
                </li>
              </ul>
            </li>

            <li>
              <b>Opción 2:</b> <code>author</code>{" "}
              <b>(Ranged), con monitoreo de hotspots.</b>
            </li>
            <li style={{ listStyleType: "none" }}>
              <ul className="sub-list">
                <li>
                  Si tu patrón de consulta es principalmente por autor y puedes
                  aceptar el riesgo de hotspots con autores muy activos, podrías
                  considerarlo. Pero con 50 comentarios embebidos, un post ya es
                  grande, y un autor con muchos posts puede sobrecargar un
                  shard.
                </li>
                <li>
                  <code>
                    {
                      'db.adminCommand({ shardCollection: "daily_db.posts", key: { author: 1 } })'
                    }
                  </code>
                </li>
              </ul>
            </li>
          </ul>

          <br />
          <p>
            <b>Pasos Conceptuales para Implementar Sharding:</b>
          </p>
          <br />

          <ul style={{listStyle: 'none'}}>
            <li>
              1- <b>Configurar el Clúster Shardeado:</b>
            </li>
            <li>
              <ul>
                <li>
                  Iniciar los <b>Config Servers</b> como un replica set (por lo
                  general 3 nodos para redundancia).
                </li>
                <li>
                  Iniciar los Shard Replica Sets (cada shard es un replica set,
                  por lo general 3 nodos por shard). Puedes empezar con 2
                  shards.
                </li>
                <li>
                  Iniciar los procesos <code>mongos</code> (los routers). Aquí
                  es donde tu aplicación se conectaría.
                </li>
              </ul>
            </li>
            <li>
              2- <b>Añadir los Shards al Clúster:</b>
            </li>
            <li>
              <ul>
                <li>
                  Desde una instancia <code>mongos</code>, usar{" "}
                  <code>sh.addShard("replicaSetName/host:port")</code> para
                  añadir cada replica set de shard al clúster.
                </li>
              </ul>
            </li>
            <li>3- <b>Habilitar Sharding para la Base de Datos:</b></li>
            <li>
              <ul>
                <li>
                  <code>sh.enableSharding("daily_db")</code>
                </li>
              </ul>
            </li>
            <li>
              4- <b>Shardear la Colección</b> <code>posts</code> <b>:</b>
            </li>
            <li>
              <ul>
                <li>
                  Aquí es donde eliges tu clave de shard. Por ejemplo, para
                  sharding hasheado por <code>_id</code> :
                  <br />
                  <div className="codes">
                    <SyntaxHighlighter
                      language={"typescript"}
                      style={oneDark}
                      showLineNumbers
                    >
                      {'sh.shardCollection("daily_db.posts", { "_id": "hashed" })'}
                    </SyntaxHighlighter>
                  </div>
                </li>
                <li>
                  O para sharding por rango con <code>author</code> :
                   <br />
                  <div className="codes">
                    <SyntaxHighlighter
                      language={"typescript"}
                      style={oneDark}
                      showLineNumbers
                    >
                      {'sh.shardCollection("daily_db.posts", { "author": 1 })'}
                    </SyntaxHighlighter>
                  </div>
                </li>
              </ul>
            </li>

            <li>
              5- <b>Monitorear</b>:
            </li>
            <li>
              <ul>
                <li>Observar el <b>Balancer</b> de MongoDB (un proceso en segundo plano que mueve automáticamente los "chunks" de datos entre shards para mantener una distribución uniforme).</li>
                <li>Monitorear el rendimiento de los shards para identificar posibles hotspots.</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
